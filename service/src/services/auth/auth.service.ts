import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { Propagation, Transactional } from 'typeorm-transactional';

import {
  AuthErrors,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  SALT_ROUNDS,
  SignInRequest,
  SignInResponse,
  UserDetailsResponse,
  UserResponse,
  UserTokenType,
  UserType,
} from '../../common';
import { Adherent, Admin, Client, Organization } from '../../entities';
import { MailerService } from '../mailer.service';
import { OrganizationsService } from '../organizations';
import {
  AdherentsService,
  AdminsService,
  ClientsService,
  UsersService,
  UserTokensService,
} from '../users';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwtService: JwtService,
    private readonly userTokens: UserTokensService,
    private readonly mailer: MailerService,
    private readonly admins: AdminsService,
    private readonly clients: ClientsService,
    private readonly adherents: AdherentsService,
    private readonly organizations: OrganizationsService,
  ) {}

  async signIn(payload: SignInRequest): Promise<SignInResponse> {
    const { email, password } = payload;
    const user = await this.users.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException(
        AuthErrors.WrongCredentials,
        'The provided credentials are not valid',
      );
    }

    return this.generateJwt(new UserResponse(user));
  }

  async forgotPasswordToken(request: ForgotPasswordRequest): Promise<void> {
    const user = await this.users.findOne({ email: request.email });

    const token = await this.userTokens.createUserToken({
      type: UserTokenType.ResetPassword,
      userId: user.id,
    });

    await this.mailer.sendResetPasswordEmail(
      new UserResponse(user),
      token.token,
    );
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async changePassword(payload: ChangePasswordRequest): Promise<void> {
    const userToken = await this.userTokens.verifyTokenValidity(
      payload.emailToken,
      UserTokenType.ResetPassword,
    );
    await this.users.updateById(userToken.userId, {
      password: await bcrypt.hash(payload.password, SALT_ROUNDS),
    });
    await this.userTokens.delete(userToken.id);
  }

  async getUserDetailsById(userId: string) {
    const userData = await this.users.getById(userId);
    const user = new UserResponse(userData);
    return this.getUserDetails(user);
  }

  async getUserDetails(user: UserResponse): Promise<UserDetailsResponse> {
    let client: Client;
    let adherent: Adherent;
    let admin: Admin;
    let organization: Organization;

    switch (user.userType) {
      case UserType.Client:
        client = await this.clients.getById(user.id, {
          search: { expands: ['userRoles.role'] },
        });
        break;
      case UserType.Admin:
        admin = await this.admins.getById(user.id, {
          search: { expands: ['userRoles.role'] },
        });
        break;
      case UserType.Adherent:
        adherent = await this.adherents.getById(user.id, {
          search: { expands: ['userRoles.role'] },
        });
        break;
      default:
        throw new BadRequestException(
          AuthErrors.UnsupportedUserType,
          'Unsupported user type',
        );
    }

    if (user.userType === UserType.Adherent && !!adherent?.organizationId) {
      organization = await this.organizations.getOrganization(
        adherent.organizationId,
      );
    }

    return new UserDetailsResponse({
      user: client || admin || adherent,
      userType: user.userType,
      organization,
    });
  }

  private async generateJwt(user: UserResponse): Promise<SignInResponse> {
    const accessToken = this.jwtService.sign({ ...user });

    return new SignInResponse({
      token: {
        accessToken,
      },
    });
  }
}
