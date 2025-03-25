import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { map } from 'lodash';
import { Propagation, Transactional } from 'typeorm-transactional';

import {
  AuthErrors,
  CrudService,
  getRandomString,
  SALT_ROUNDS,
  UserRequest,
  UserResponse,
  UserType,
} from '../../common';
import { conf } from '../../configuration';
import { User } from '../../entities';
import { UsersRepository } from '../../repositories';
import { MailerService } from '../mailer.service';
import { UserRolesService } from '../roles';
import { AdherentsService } from './adherents.service';
import { AdminsService } from './admins.service';
import { ClientsService } from './clients.service';
import { TokensService } from './tokens.service';

const ONE_HOUR = 60 * 60 * 1000;

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
    private tokens: TokensService,
    private jwtService: JwtService,
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
        throw new Error('Unsupported user type');
    }

    if (payload.roles?.length) {
      map(payload.roles, async (roleId) => {
        await this.userRoles.create({ roleId, userId: user.id });
      });
    }

    const tokenPayload = { id: user.id, email: user.email };
    const tokenValue = this.jwtService.sign(tokenPayload);
    const token = await this.tokens.create({
      userId: user.id,
      token: tokenValue,
      name: 'user activation',
      expirationDate: new Date(user.createdAt.getTime() + ONE_HOUR),
    });

    await this.mailer.sendEmail({
      recipients: [
        {
          name: user.name,
          address: user.email,
        },
      ],
      subject: 'Activate your account',
      html: this.getActivationEmailContent(
        user.name,
        token.token,
        finalPassword,
      ),
    });

    return new UserResponse(user);
  }

  private getActivationEmailContent(
    userName: string,
    token: string,
    finalPassword: string,
  ): string {
    const activationUrl = `${conf.front.baseUrl}/${conf.front.activateAccountUri}/${token}`;
    return `<h1>Reset your password</h1>
            <p>Hello ${userName}, Click <a href="${activationUrl}">here</a> to activate your account.</p>
            <p>This is your password: <span>${finalPassword}</span>. You should change it as soon as possible.</p>`;
  }
}
