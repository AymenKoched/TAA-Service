import {
  BadRequestException,
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import {
  AuthErrors,
  ConvertResponse,
  OrganizationResponse,
  UserDetailsResponse,
  UserResponse,
  UserType,
} from '../common';
import { CurrentUser } from '../decorators';
import { Adherent, Admin, Client } from '../entities';
import { JwtAuthGuard } from '../guards';
import {
  AdherentsService,
  AdminsService,
  ClientsService,
  OrganizationsService,
  UsersService,
} from '../services';

@Controller({ path: 'me' })
@UseGuards(JwtAuthGuard)
export class UserDetailsController {
  constructor(
    private readonly users: UsersService,
    private readonly admins: AdminsService,
    private readonly clients: ClientsService,
    private readonly adherents: AdherentsService,
    private readonly organizations: OrganizationsService,
  ) {}

  @Get()
  @ConvertResponse(UserDetailsResponse)
  public async getUserDetails(
    @CurrentUser() user: UserResponse,
  ): Promise<UserDetailsResponse> {
    let client: Client;
    let adherent: Adherent;
    let admin: Admin;
    let organization: OrganizationResponse;

    switch (user.userType) {
      case UserType.Client:
        client = await this.clients.getById(user.id, {
          search: { expands: ['userRoles.role'] },
        });
        break;
      case UserType.Admin:
        admin = await this.admins.getById(user.id, {
          search: { expands: ['userRoles.role'] },
        });
        break;
      case UserType.Adherent:
        adherent = await this.adherents.getById(user.id, {
          search: { expands: ['userRoles.role'] },
        });
        break;
      default:
        throw new BadRequestException(
          AuthErrors.UnsupportedUserType,
          'Unsupported user type',
        );
    }

    if (user.userType === UserType.Adherent && !!adherent?.organizationId) {
      organization = await this.organizations.getOrganization(
        adherent.organizationId,
      );
    }

    return new UserDetailsResponse({
      user: client || admin || adherent,
      userType: user.userType,
      organization,
    });
  }
}
