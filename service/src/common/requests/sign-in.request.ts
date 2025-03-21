import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

import { BaseModel } from '../base';
import { EmailTransformer } from '../transformers';

export class SignInRequest extends BaseModel {
  @ApiProperty()
  @IsEmail(undefined, { message: 'errors:field.invalid' })
  @Transform(EmailTransformer)
  email!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  password!: string;
}
