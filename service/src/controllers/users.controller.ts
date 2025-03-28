import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import {
  ActivateUserRequest,
  ConvertResponse,
  RoleAccess,
  UpdateUserRequest,
  UserRequest,
  UserResponse,
} from '../common';
import { HasRoleAccess } from '../guards';
import { UsersService } from '../services';

@Controller({ path: 'users' })
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Post()
  @HasRoleAccess({ accesses: RoleAccess.CreateUser })
  @ConvertResponse(UserResponse)
  public async createUser(@Body() payload: UserRequest): Promise<UserResponse> {
    return this.users.createUser(payload);
  }

  @Put('activate')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async activateUser(
    @Body() payload: ActivateUserRequest,
  ): Promise<void> {
    return this.users.activateUser(payload);
  }

  @Post(':userId/resend-activation-token')
  @HasRoleAccess({ accesses: RoleAccess.CreateUser })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async resendToken(@Param('userId') userId: string): Promise<void> {
    return this.users.resendToken(userId);
  }

  @Put(':userId')
  @HasRoleAccess({ accesses: RoleAccess.UpdateUser })
  @ConvertResponse(UserResponse)
  public async updateUser(
    @Param('userId') userId: string,
    @Body() payload: UpdateUserRequest,
  ): Promise<UserResponse> {
    return this.users.updateUser(userId, payload);
  }
}
