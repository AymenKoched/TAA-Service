import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { Propagation, Transactional } from 'typeorm-transactional';

import {
  AuthErrors,
  CrudService,
  getRandomString,
  SALT_ROUNDS,
  SendEmailRequest,
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
import { UserTokensService } from './user-tokens.service';

@Injectable()
export class UsersService extends CrudService<User> {
  protected notFoundErrorKey = AuthErrors.UserNotFound;
  protected notFoundErrorMessage = 'The searched user is not found';

  constructor(
    private users: UsersRepository,
    private admins: AdminsService,
    private clients: ClientsService,
    private adherents: AdherentsService,
    private userRoles: UserRolesService,
    private mailer: MailerService,
    private tokens: UserTokensService,
  ) {
    super(users);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async createUser(payload: UserRequest) {
    const finalPassword = payload.password ?? getRandomString(8);
    const hashedPassword = await bcrypt.hash(finalPassword, SALT_ROUNDS);

    const userPayload = {
      ...payload,
      password: hashedPassword,
      inscriptionDate: payload.inscriptionDate ?? new Date(),
      isActive: false,
    };

    let user: User;
    switch (payload.type) {
      case UserType.Client:
        user = await this.clients.create(userPayload);
        break;
      case UserType.Admin:
        user = await this.admins.create(userPayload);
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
    const token = await this.tokens.createUserToken({
      name: 'user activation',
      userId: user.id,
    });

    await this.mailer.sendEmail(
      new SendEmailRequest({
        recipients: [
          {
            name: user.name,
            address: user.email,
          },
        ],
        subject: 'Activate your account',
        html: this.mailer.getActivationEmailContent(
          user.name,
          token.token,
          finalPassword,
        ),
      }),
    );

    return new UserResponse(user);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async activateUser(token: string) {
    const userToken = await this.tokens.verifyTokenValidity(token);
    const user = await this.getById(userToken.user.id);
    await this.updateById(user.id, { isActive: true });
    await this.tokens.deleteByCriteria({ token });
  }
}
