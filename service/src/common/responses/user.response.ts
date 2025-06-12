import { Expose, Transform, Type } from 'class-transformer';
import { includes, map, some } from 'lodash';

import { BaseResponseModel } from '../base';
import { ApiProperty, ApiPropertyOptional } from '../decorators';
import { RoleAccess, UserType } from '../enums';
import { ModelTransformer, PhoneTransformer } from '../transformers';
import { OrganizationResponse } from './organization.response';
import { RoleResponse } from './role.response';
import { UserRoleResponse } from './user-role.response';
import { UserTokenResponse } from './user-token.response';

export class UserResponse extends BaseResponseModel {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiPropertyOptional()
  inscriptionDate?: Date;

  @ApiPropertyOptional()
  @Transform(PhoneTransformer)
  phone?: string;

  @ApiPropertyOptional()
  location?: string;

  @ApiProperty()
  userType!: UserType;

  @ApiPropertyOptional()
  @Type(() => UserRoleResponse)
  @Transform(ModelTransformer(() => UserRoleResponse))
  userRoles?: UserRoleResponse[];

  @ApiPropertyOptional()
  @Expose()
  @Type(() => RoleResponse)
  @Transform(
    ModelTransformer(({ obj }) => [
      RoleResponse,
      map(obj.userRoles, ({ role }) => role) || [],
    ]),
  )
  roles?: RoleResponse[];

  @ApiPropertyOptional()
  @Type(() => UserTokenResponse)
  @Transform(ModelTransformer(() => UserTokenResponse))
  tokens?: UserTokenResponse[];

  @Expose()
  @ApiProperty()
  get isSuperAdmin(): boolean {
    return some(this.roles, (role) =>
      includes(role.accesses, RoleAccess.SuperAdminAccess),
    );
  }
}

export class AdminResponse extends UserResponse {
  @Expose()
  @ApiProperty()
  get isSuperAdmin(): boolean {
    return some(this.roles, (role) =>
      includes(role.accesses, RoleAccess.SuperAdminAccess),
    );
  }
}

export class ClientResponse extends UserResponse {
  @Expose()
  @ApiProperty()
  get isSuperAdmin(): boolean {
    return some(this.roles, (role) =>
      includes(role.accesses, RoleAccess.SuperAdminAccess),
    );
  }
}

export class AdherentResponse extends UserResponse {
  @ApiProperty()
  organizationId!: string;

  @ApiProperty({ type: () => OrganizationResponse })
  @Transform(ModelTransformer(() => OrganizationResponse))
  @Type(() => OrganizationResponse)
  organization?: OrganizationResponse;

  @ApiPropertyOptional()
  position?: string;

  @ApiProperty()
  adherence!: boolean;

  @Expose()
  @ApiProperty()
  get isSuperAdmin(): boolean {
    return some(this.roles, (role) =>
      includes(role.accesses, RoleAccess.SuperAdminAccess),
    );
  }
}
