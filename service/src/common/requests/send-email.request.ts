import { IsNotEmpty, IsString } from 'class-validator';
import { Address } from 'nodemailer/lib/mailer';

import { BaseModel } from '../base';
import { ApiProperty, ApiPropertyOptional, IsOptional } from '../decorators';

export class SendEmailRequest extends BaseModel {
  @ApiPropertyOptional()
  @IsOptional()
  from?: Address;

  @ApiProperty()
  @IsNotEmpty()
  recipients!: Address[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  subject!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  html!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional()
  @IsOptional()
  placeholderReplacement?: Record<string, string>;
}
