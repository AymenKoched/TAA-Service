import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { difference, map, omit } from 'lodash';
import { Propagation, Transactional } from 'typeorm-transactional';

import {
  ActivateUserRequest,
  AuthErrors,
  CrudService,
  getRandomString,
  SALT_ROUNDS,
  UpdateUserRequest,
  UserRequest,
  UserResponse,
  UserTokenType,
  UserType,
} from '../../common';
import { User } from '../../entities';
import { UsersRepository } from '../../repositories';
import { MailerService } from '../mailer.service';
import { UserRolesService } from '../roles';
import { AdherentsService } from './adherents.service';
import { AdminsService } from './admins.service';
import { ClientsService } from './clients.service';
import { UserTokensService } from './user-tokens.service';

@Injectable()
export class UsersService extends CrudService<User> {
  protected notFoundErrorKey = AuthErrors.UserNotFound;
  protected notFoundErrorMessage = 'The searched user is not found';

  constructor(
    private readonly users: UsersRepository,
    private readonly admins: AdminsService,
    private readonly clients: ClientsService,
    private readonly adherents: AdherentsService,
    private readonly userRoles: UserRolesService,
    private readonly mailer: MailerService,
    private readonly tokens: UserTokensService,
  ) {
    super(users);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async createUser(payload: UserRequest) {
    await this.checkEmail(payload.email);
    await this.checkPhone(payload.phone);

    const finalPassword = payload.password ?? getRandomString(8);
    const hashedPassword = await bcrypt.hash(finalPassword, SALT_ROUNDS);

    const userPayload = {
      ...payload,
      password: hashedPassword,
      inscriptionDate: payload.inscriptionDate ?? new Date(),
      isActive: payload.type === UserType.Adherent,
    };

    let user: User;
    switch (payload.type) {
      case UserType.Client:
        user = await this.clients.create(userPayload);
        break;
      case UserType.Admin:
        user = await this.admins.create(userPayload);
        break;
      case UserType.Adherent:
        user = await this.adherents.create(userPayload);
        break;
      default:
        throw new BadRequestException(
          AuthErrors.UnsupportedUserType,
          'Unsupported user type',
        );
    }

    if (payload.roles?.length) {
      await Promise.all(
        payload.roles.map((roleId) =>
          this.userRoles.create({ roleId, userId: user.id }),
        ),
      );
    }

    if (payload.type === UserType.Adherent) {
      await this.mailer.sendAdherentEmail(
        new UserResponse(user),
        finalPassword,
      );
    } else {
      const token = await this.tokens.createUserToken({
        type: UserTokenType.ActivateAccount,
        userId: user.id,
      });

      await this.mailer.sendActivationEmail(
        new UserResponse(user),
        token.token,
        finalPassword,
      );
    }

    return new UserResponse(user);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async updateUser(userId: string, payload: UpdateUserRequest) {
    await this.checkPhone(payload.phone, userId);

    await this.updateById(userId, omit(payload, 'roles'));

    if (payload?.roles?.length) {
      const user = await this.getById(userId, {
        search: { expands: ['userRoles'] },
      });

      const currentRoleIds = map(user.userRoles, 'roleId');
      const newRoleIds = payload.roles;

      const rolesToRemove = difference(currentRoleIds, newRoleIds);
      const rolesToAdd = difference(newRoleIds, currentRoleIds);

      if (rolesToRemove.length) {
        await Promise.all(
          map(rolesToRemove, (roleId) =>
            this.userRoles.deleteByCriteria({ userId, roleId }),
          ),
        );
      }

      if (rolesToAdd.length) {
        await Promise.all(
          map(rolesToAdd, (roleId) =>
            this.userRoles.create({ userId, roleId }),
          ),
        );
      }
    }

    const updatedUser = await this.getById(userId, {
      search: { expands: ['userRoles.role'] },
    });

    return new UserResponse(updatedUser);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async activateUser(payload: ActivateUserRequest) {
    const userToken = await this.tokens.verifyTokenValidity(
      payload.emailToken,
      UserTokenType.ActivateAccount,
    );

    const user = await this.getById(userToken.user.id);
    await this.updateById(user.id, { isActive: true });

    await this.tokens.delete(userToken.id);
  }

  async resendToken(userId: string) {
    const user = await this.getById(userId);

    const token = await this.tokens.createUserToken({
      type: UserTokenType.ActivateAccount,
      userId: user.id,
    });

    await this.mailer.sendActivationEmail(new UserResponse(user), token.token);
  }

  async checkEmail(email?: string, id?: string) {
    if (email) {
      const response = await this.users.findOne({ email });
      if (!!response && response.id != id) {
        throw new BadRequestException(
          AuthErrors.EmailAlreadyExists,
          'The email you attempt to use is already taken',
        );
      }
    }
  }

  async checkPhone(phone?: string, id?: string) {
    if (phone) {
      const res = await this.users.findOne({ phone });
      if (!!res && res.id != id) {
        throw new BadRequestException(
          AuthErrors.PhoneAlreadyExists,
          'The phone number you attempt to use is already taken',
        );
      }
    }
  }
}
