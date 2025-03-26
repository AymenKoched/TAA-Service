import { ApiProperty } from '../decorators';
import { BaseModel } from './base.model';

export class BaseResponseModel extends BaseModel {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
