import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';

import {
  ConvertResponse,
  UpdateUserRequest,
  UserDetailsResponse,
  UserResponse,
} from '../common';
import { CurrentUser } from '../decorators';
import { JwtAuthGuard } from '../guards';
import { AuthService, UsersService } from '../services';

@Controller({ path: 'me' })
@UseGuards(JwtAuthGuard)
export class UserDetailsController {
  constructor(
    private readonly auth: AuthService,
    private readonly users: UsersService,
  ) {}

  @Get()
  @ConvertResponse(UserDetailsResponse)
  public async getUserDetails(
    @CurrentUser() user: UserResponse,
  ): Promise<UserDetailsResponse> {
    return this.auth.getUserDetails(user);
  }

  @Put()
  @ConvertResponse(UserResponse)
  public async updateMe(
    @CurrentUser() user: UserResponse,
    @Body() payload: UpdateUserRequest,
  ) {
    return this.users.updateUser(user.id, payload);
  }
}
