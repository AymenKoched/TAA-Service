import { IsNotEmpty, IsString } from 'class-validator';
import { Address } from 'nodemailer/lib/mailer';

import { BaseModel } from '../base';
import { IsOptional } from '../decorators';

export class SendEmailRequest extends BaseModel {
  @IsOptional()
  from?: Address;

  @IsNotEmpty()
  recipients: Address[];

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  html: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  placeholderReplacement?: Record<string, string>;
}
