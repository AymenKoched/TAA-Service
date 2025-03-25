import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import {
  AuthErrors,
  SignInRequest,
  SignInResponse,
  UserResponse,
} from '../../common';
import { UsersService } from '../users';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwtService: JwtService,
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

  private async generateJwt(user: UserResponse): Promise<SignInResponse> {
    const accessToken = this.jwtService.sign({ ...user });

    return new SignInResponse({
      token: {
        accessToken,
      },
    });
  }
}
