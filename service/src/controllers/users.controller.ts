import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  AdherentResponse,
  AdminResponse,
  ClientResponse,
  ConvertResponse,
  RoleAccess,
  UpdateUserAdherenceRequest,
  UpdateUserRequest,
  UserRequest,
  UserResponse,
  UsersSearchFilter,
  UserType,
} from '../common';
import {
  HasRoleAccess,
  HasUserAccess,
  HasUserTypeAccess,
  JwtAuthGuard,
} from '../guards';
import {
  AdherentsService,
  AdminsService,
  ClientsService,
  UsersService,
} from '../services';

@Controller({ path: 'users' })
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly users: UsersService,
    private readonly admins: AdminsService,
    private readonly adherents: AdherentsService,
    private readonly clients: ClientsService,
  ) {}

  @Get('admin')
  @HasUserTypeAccess({ types: [UserType.Admin] })
  @HasRoleAccess({ accesses: RoleAccess.ViewUser })
  @ConvertResponse(AdminResponse)
  public async getAdmins(@Query() filters: UsersSearchFilter) {
    return this.admins.search({ ...filters, expands: ['userRoles.role'] });
  }

  @Post('admin')
  @HasUserTypeAccess({ types: [UserType.Admin] })
  @HasRoleAccess({ accesses: RoleAccess.CreateUser })
  @ConvertResponse(AdminResponse)
  public async createAdmin(@Body() payload: UserRequest) {
    return this.users.createUser({ ...payload, type: UserType.Admin });
  }

  @Delete('admin/:adminId')
  @HasUserTypeAccess({ types: [UserType.Admin] })
  @HasRoleAccess({ accesses: RoleAccess.DeleteUser })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAdmin(@Param('adminId') adminId: string) {
    return this.admins.deleteAdmin(adminId);
  }

  @Put(':userId')
  @HasUserTypeAccess({ types: [UserType.Admin] })
  @HasRoleAccess({ accesses: RoleAccess.UpdateUser })
  @ConvertResponse(UserResponse)
  public async updateUser(
    @Param('userId') userId: string,
    @Body() payload: UpdateUserRequest,
  ): Promise<UserResponse> {
    return this.users.updateUser(userId, payload);
  }

  @Put('adherent/:adherentId/adherence')
  @HasUserAccess()
  @HasRoleAccess({ accesses: RoleAccess.UpdateUser })
  @ConvertResponse(AdherentResponse)
  public async updateUserAdherence(
    @Param('adherentId') adherentId: string,
    @Body() payload: UpdateUserAdherenceRequest,
  ): Promise<AdherentResponse> {
    return this.adherents.updateAdherence(adherentId, payload);
  }

  @Get('client')
  @HasUserTypeAccess({ types: [UserType.Admin] })
  @HasRoleAccess({ accesses: RoleAccess.ViewUser })
  @ConvertResponse(ClientResponse)
  public async getClients(@Query() filters: UsersSearchFilter) {
    return this.clients.search({
      ...filters,
      expands: ['userRoles.role', 'subscriptions.subscription'],
    });
  }

  @Delete('client/:clientId')
  @HasUserTypeAccess({ types: [UserType.Admin] })
  @HasRoleAccess({ accesses: RoleAccess.DeleteUser })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteClient(@Param('clientId') clientId: string) {
    return this.clients.deleteClient(clientId);
  }
}
