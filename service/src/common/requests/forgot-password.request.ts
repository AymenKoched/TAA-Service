import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty } from '../decorators';
import { EmailTransformer } from '../transformers';

export class ForgotPasswordRequest extends BaseModel {
  @IsEmail({}, { message: 'errors:field.invalid' })
  @ApiProperty()
  @Transform(EmailTransformer)
  email!: string;
}
