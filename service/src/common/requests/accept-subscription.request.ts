import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty, ApiPropertyOptional, IsOptional } from '../decorators';
import { NumberTransformer } from '../transformers';

export class AcceptSubscriptionRequest extends BaseModel {
  @ApiPropertyOptional()
  @IsDateString({ strict: true }, { message: 'errors:field.invalid' })
  @IsOptional()
  activationDate?: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'errors:field.required' })
  @Transform(NumberTransformer)
  durationDays!: number;
}
