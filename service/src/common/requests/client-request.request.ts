import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

import { BaseModel } from '../base';
import { NAMES_REGEX } from '../constants';
import { ApiProperty, ApiPropertyOptional, IsOptional } from '../decorators';
import {
  EmailTransformer,
  NameTransformer,
  PhoneTransformer,
} from '../transformers';

export class ClientRequestRequest extends BaseModel {
  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @Matches(NAMES_REGEX, { message: 'errors:field.alphabetic' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @Transform(NameTransformer)
  name!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsEmail({}, { message: 'errors:field.invalid' })
  @MaxLength(200, { message: 'errors:field.max_length.200' })
  @Transform(EmailTransformer)
  email!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(PhoneTransformer)
  @IsPhoneNumber(undefined, { message: 'errors:field.invalid' })
  phone?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'errors:field.invalid' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @IsOptional()
  location?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsString({ message: 'errors:field.invalid' })
  subscriptionId!: string;
}
