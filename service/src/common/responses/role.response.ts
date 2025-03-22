import { Transform, Type } from 'class-transformer';

import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';
import { RoleAccess } from '../enums';
import { ModelTransformer } from '../transformers';
import { UserRoleResponse } from './user-role.response';

export class RoleResponse extends BaseResponseModel {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  accesses!: RoleAccess[];

  @ApiProperty()
  @Transform(ModelTransformer(() => UserRoleResponse))
  @Type(() => UserRoleResponse)
  users?: UserRoleResponse[];
}
