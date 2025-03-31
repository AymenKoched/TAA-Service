import { Transform, Type } from 'class-transformer';

import { BaseModel } from '../base';
import { ApiProperty, ApiPropertyOptional } from '../decorators';
import { UserType } from '../enums';
import { ModelTransformer } from '../transformers';
import { OrganizationResponse } from './organization.response';
import {
  AdherentResponse,
  AdminResponse,
  ClientResponse,
} from './user.response';

export class UserDetailsResponse extends BaseModel {
  @ApiProperty()
  @Transform(
    ModelTransformer(({ obj }) => {
      switch (obj.userType) {
        case UserType.Admin:
          return AdminResponse;
        case UserType.Client:
          return ClientResponse;
        case UserType.Adherent:
          return AdherentResponse;
        default:
          return null;
      }
    }),
  )
  @Type(({ object }) => {
    switch (object.userType) {
      case UserType.Admin:
        return AdminResponse;
      case UserType.Client:
        return ClientResponse;
      case UserType.Adherent:
        return AdherentResponse;
      default:
        return null;
    }
  })
  user!: AdminResponse | ClientResponse | AdherentResponse;

  @ApiProperty()
  userType!: UserType;

  @ApiPropertyOptional()
  @Transform(ModelTransformer(() => OrganizationResponse))
  @Type(() => OrganizationResponse)
  organization?: OrganizationResponse;
}
