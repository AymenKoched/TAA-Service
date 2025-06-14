import { Body, Controller, Param, Put } from '@nestjs/common';

import {
  AdherentResponse,
  ConvertResponse,
  RoleAccess,
  UpdateUserAdherenceRequest,
  UpdateUserRequest,
  UserResponse,
} from '../common';
import { HasRoleAccess, HasUserAccess } from '../guards';
import { UsersService } from '../services';

@Controller({ path: 'users' })
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Put(':userId/adherence')
  @HasUserAccess()
  @HasRoleAccess({ accesses: RoleAccess.UpdateUser })
  @ConvertResponse(AdherentResponse)
  public async updateUserAdherence(
    @Param('userId') userId: string,
    @Body() payload: UpdateUserAdherenceRequest,
  ): Promise<AdherentResponse> {
    return this.users.updateAdherence(userId, payload);
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
