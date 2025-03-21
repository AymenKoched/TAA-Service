import { Transform, Type } from 'class-transformer';

import { BaseResponseModel } from '../base';
import { ApiProperty, ApiPropertyOptional } from '../decorators';
import { ModelTransformer, PhoneTransformer } from '../transformers';
import { UserRoleResponse } from './user-role.response';

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
  @Transform(ModelTransformer(() => UserRoleResponse))
  @Type(() => UserRoleResponse)
  roles!: UserRoleResponse[];
}

export class AdminResponse extends UserResponse {}

export class ClientResponse extends UserResponse {}

export class AdherentResponse extends UserResponse {}
