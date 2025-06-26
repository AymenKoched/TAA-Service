import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty, ApiPropertyOptional, IsOptional } from '../decorators';
import {
  UserReclamationPriority,
  UserReclamationState,
  UserReclamationType,
} from '../enums';
import { NumberTransformer, StringTransformer } from '../transformers';

export class UserReclamationRequest extends BaseModel {
  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsEnum(UserReclamationType, { message: 'errors:field.invalid' })
  type!: UserReclamationType;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @IsDateString({ strict: true }, { message: 'errors:field.invalid' })
  startDate!: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @Transform(NumberTransformer)
  windowDays!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'errors:field.invalid' })
  @Transform(StringTransformer)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(StringTransformer)
  fileUrl?: string;
}

export class UserReclamationUpdateRequest extends BaseModel {
  @ApiProperty()
  @IsOptional()
  @IsEnum(UserReclamationType, { message: 'errors:field.invalid' })
  type?: UserReclamationType;

  @ApiProperty()
  @IsOptional()
  @IsEnum(UserReclamationPriority, { message: 'errors:field.invalid' })
  priority?: UserReclamationPriority;

  @ApiProperty()
  @IsOptional()
  @IsDateString({ strict: true }, { message: 'errors:field.invalid' })
  startDate?: Date;

  @ApiProperty()
  @IsOptional()
  @Transform(NumberTransformer)
  windowDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'errors:field.invalid' })
  @Transform(StringTransformer)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(StringTransformer)
  fileUrl?: string;
}

export class UserReclamationStateRequest extends BaseModel {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(UserReclamationState, { message: 'errors:field.invalid' })
  state!: UserReclamationState;
}
