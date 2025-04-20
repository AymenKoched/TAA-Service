import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

import { BaseModel } from '../base';
import { ApiProperty, IsOptional } from '../decorators';
import { NumberTransformer } from '../transformers';

export class OrganizationFormationRequest extends BaseModel {
  @ApiProperty()
  @IsOptional()
  @Transform(NumberTransformer)
  menHours?: number;

  @ApiProperty()
  @IsOptional()
  @Transform(NumberTransformer)
  womenHours?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  mainFormation?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  employeesTrained?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  revenueInvestment?: string;
}
