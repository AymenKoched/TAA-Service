import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';

import {
  ChangePasswordRequest,
  ConvertResponse,
  ForgotPasswordRequest,
  SignInRequest,
  SignInResponse,
} from '../common';
import { AuthService } from '../services';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('sign-in')
  @ConvertResponse(SignInResponse)
  public async signIn(@Body() payload: SignInRequest): Promise<SignInResponse> {
    return this.auth.signIn(payload);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(@Body() request: ForgotPasswordRequest): Promise<void> {
    await this.auth.forgotPasswordToken(request);
  }

  @Put('change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(@Body() payload: ChangePasswordRequest): Promise<void> {
    return this.auth.changePassword(payload);
  }
}
