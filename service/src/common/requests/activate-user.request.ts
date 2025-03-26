import { IsNotEmpty } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty } from '../decorators';

export class ActivateUserRequest extends BaseModel {
  @IsNotEmpty({ message: 'errors:field.required' })
  @ApiProperty()
  emailToken!: string;
}
