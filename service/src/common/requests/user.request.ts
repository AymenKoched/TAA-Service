import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  ValidateIf,
} from 'class-validator';

import { BaseModel } from '../base';
import { NAMES_REGEX, PASSWORD_REGEX } from '../constants';
import { ApiProperty, ApiPropertyOptional, IsOptional } from '../decorators';
import { UserType } from '../enums';
import { StringArray } from '../models';
import {
  EmailTransformer,
  NameTransformer,
  PhoneTransformer,
  StringArrayTransformer,
} from '../transformers';

export class UserRequest extends BaseModel {
  @IsNotEmpty({ message: 'errors:field.required' })
  @Matches(NAMES_REGEX, { message: 'errors:field.alphabetic' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @ApiProperty()
  @Transform(NameTransformer)
  name!: string;

  @IsNotEmpty({ message: 'errors:field.required' })
  @IsEmail({}, { message: 'errors:field.invalid' })
  @MaxLength(200, { message: 'errors:field.max_length.200' })
  @ApiProperty()
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

  @ApiPropertyOptional()
  @IsDateString({ strict: true }, { message: 'errors:field.invalid' })
  @IsOptional()
  inscriptionDate?: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsEnum(UserType, { message: 'errors:field.invalid' })
  type!: UserType;

  @ApiPropertyOptional()
  @Matches(PASSWORD_REGEX, { message: 'errors:field.invalid' })
  @IsOptional()
  password?: string;

  @ApiPropertyOptional()
  @Type(() => StringArray)
  @Transform(StringArrayTransformer)
  @IsOptional()
  roles?: StringArray;

  @ApiPropertyOptional()
  @ValidateIf((self, value) => value || self.type === UserType.Adherent)
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsString({ message: 'errors:field.invalid' })
  organizationId?: string;
}

export class UpdateUserRequest extends BaseModel {
  @ApiPropertyOptional()
  @IsOptional(false)
  @IsNotEmpty({ message: 'errors:field.required' })
  @Matches(NAMES_REGEX, { message: 'errors:field.alphabetic' })
  @MaxLength(100, { message: 'errors:field.max_length.100' })
  @Transform(NameTransformer)
  name?: string;

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

  @ApiPropertyOptional()
  @IsDateString({ strict: true }, { message: 'errors:field.invalid' })
  @IsOptional()
  inscriptionDate?: Date;

  @ApiProperty()
  @Type(() => StringArray)
  @Transform(StringArrayTransformer)
  @IsOptional()
  roles?: StringArray;
}
