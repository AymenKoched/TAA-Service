import { Body, Controller, Post } from '@nestjs/common';

import { ConvertResponse, SignInRequest, SignInResponse } from '../common';
import { AuthService } from '../services';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ConvertResponse(SignInResponse)
  public async SignIn(@Body() payload: SignInRequest): Promise<SignInResponse> {
    return this.authService.signIn(payload);
  }
}
