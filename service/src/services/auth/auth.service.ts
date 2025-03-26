import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { Propagation, Transactional } from 'typeorm-transactional';

import {
  AuthErrors,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  SALT_ROUNDS,
  SendEmailRequest,
  SignInRequest,
  SignInResponse,
  UserResponse,
} from '../../common';
import { MailerService } from '../mailer.service';
import { UsersService, UserTokensService } from '../users';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwtService: JwtService,
    private readonly userTokens: UserTokensService,
    private readonly mailer: MailerService,
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
      name: 'user forgot password',
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
        subject: 'Reset your password',
        html: this.mailer.getResetPasswordEmailContent(user.name, token.token),
      }),
    );
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  async changePassword(payload: ChangePasswordRequest): Promise<void> {
    const userToken = await this.userTokens.verifyTokenValidity(
      payload.emailToken,
    );
    await this.users.updateById(userToken.userId, {
      password: await bcrypt.hash(payload.password, SALT_ROUNDS),
    });
    await this.userTokens.delete(userToken.id);
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
