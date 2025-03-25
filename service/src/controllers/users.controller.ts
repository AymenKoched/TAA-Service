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
  ConvertResponse,
  RoleAccess,
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
  public async CreateUser(@Body() payload: UserRequest): Promise<UserResponse> {
    return this.users.createUser(payload);
  }

  @Put(':token/activate')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async ActivateUser(@Param('token') token: string): Promise<void> {
    return this.users.activateUser(token);
  }
}
