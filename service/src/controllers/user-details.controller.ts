import { Controller, Get, UseGuards } from '@nestjs/common';

import { ConvertResponse, UserDetailsResponse, UserResponse } from '../common';
import { CurrentUser } from '../decorators';
import { JwtAuthGuard } from '../guards';
import { AuthService } from '../services';

@Controller({ path: 'me' })
@UseGuards(JwtAuthGuard)
export class UserDetailsController {
  constructor(private readonly auth: AuthService) {}

  @Get()
  @ConvertResponse(UserDetailsResponse)
  public async getUserDetails(
    @CurrentUser() user: UserResponse,
  ): Promise<UserDetailsResponse> {
    return this.auth.getUserDetails(user);
  }
}
