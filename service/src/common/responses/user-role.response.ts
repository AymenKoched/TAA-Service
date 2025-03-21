import { Transform, Type } from 'class-transformer';

import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';
import { ModelTransformer } from '../transformers';
import { RoleResponse } from './role.response';
import { UserResponse } from './user.response';

export class UserRoleResponse extends BaseResponseModel {
  @ApiProperty()
  userId!: string;

  @ApiProperty({ type: () => UserResponse })
  @Transform(ModelTransformer(() => UserResponse))
  @Type(() => UserResponse)
  user!: UserResponse;

  @ApiProperty()
  roleId!: string;

  @ApiProperty()
  @Transform(ModelTransformer(() => RoleResponse))
  @Type(() => RoleResponse)
  role!: RoleResponse[];
}
