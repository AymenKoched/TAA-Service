import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { difference, map, omit } from 'lodash';
import { Propagation, Transactional } from 'typeorm-transactional';

import {
  AuthErrors,
  CrudService,
  getRandomString,
  MODIFICATION_WINDOW_DAYS,
  SALT_ROUNDS,
  UpdateUserRequest,
  UserRequest,
  UserResponse,
  UserType,
} from '../../common';
import { User } from '../../entities';
import { UsersRepository } from '../../repositories';
import { MailerService } from '../mailer.service';
import { UserRolesService } from '../roles';
import { AdherentsService } from './adherents.service';
import { AdminsService } from './admins.service';
import { ClientsService } from './clients.service';

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
  ) {
    super(users);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async createUser(payload: UserRequest) {
    await this.checkEmail(payload.email);
    await this.checkPhone(payload.phone);

    const finalPassword = payload.password ?? getRandomString(8);
    const hashedPassword = await bcrypt.hash(finalPassword, SALT_ROUNDS);

    const now = new Date();
    const endDate = new Date(now);
    endDate.setDate(now.getDate() + MODIFICATION_WINDOW_DAYS);

    const userPayload = {
      ...payload,
      password: hashedPassword,
      inscriptionDate: payload.inscriptionDate ?? now,
    };

    let user: User;
    switch (payload.type) {
      case UserType.Client:
        user = await this.clients.create({
          ...userPayload,
          userType: UserType.Client,
        });
        break;
      case UserType.Admin:
        user = await this.admins.create({
          ...userPayload,
          userType: UserType.Admin,
        });
        break;
      case UserType.Adherent:
        user = await this.adherents.create({
          ...userPayload,
          userType: UserType.Adherent,
          modificationStartDate: now,
          modificationEndDate: endDate,
        });
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

    await this.mailer.sendWelcomeEmail(new UserResponse(user), finalPassword);

    return new UserResponse(user);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async updateUser(userId: string, payload: UpdateUserRequest) {
    await this.checkPhone(payload.phone, userId);

    const user = await this.getById(userId, {
      search: { expands: ['userRoles'] },
    });

    const userPayload = omit(payload, ['roles']);

    switch (user.userType) {
      case UserType.Client:
        await this.clients.updateById(userId, userPayload);
        break;
      case UserType.Admin:
        await this.admins.updateById(userId, userPayload);
        break;
      case UserType.Adherent:
        await this.adherents.updateById(userId, userPayload);
        break;
      default:
        throw new BadRequestException(
          AuthErrors.UnsupportedUserType,
          'Unsupported user type',
        );
    }

    if (payload?.roles) {
      const currentRoleIds = map(user.userRoles, 'roleId');
      const newRoleIds = payload.roles;

      const { removed: rolesToRemove, added: rolesToAdd } = this.getDifferences(
        newRoleIds,
        currentRoleIds,
      );

      await Promise.all(
        map(rolesToRemove, (roleId: string) =>
          this.userRoles.deleteByCriteria({ userId, roleId }),
        ),
      );

      await this.userRoles.create(
        map(rolesToAdd, (roleId) => ({ userId, roleId })),
      );
    }

    const updatedUser = await this.getById(userId, {
      search: { expands: ['userRoles.role'] },
    });

    return new UserResponse(updatedUser);
  }

  private async checkEmail(email?: string, id?: string) {
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

  private async checkPhone(phone?: string, id?: string) {
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

  private getDifferences(payload: string[], values: string[]) {
    const removed: string[] = difference(values, payload);

    const added: string[] = difference(payload, values);

    return { added, removed };
  }
}
