import { Transform } from 'class-transformer';
import { IsNumber, Validate } from 'class-validator';

import { BaseModel } from '../base';
import {
  ApiPropertyOptional,
  IsOptional,
  WasteDistribution100Validator,
} from '../decorators';
import { NumberTransformer } from '../transformers';

export class OrganizationWasteDistributionRequest extends BaseModel {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  @Transform(NumberTransformer)
  plastic?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  @Transform(NumberTransformer)
  metallic?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  @Transform(NumberTransformer)
  textilesAndLeather?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  @Transform(NumberTransformer)
  oils?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  @Transform(NumberTransformer)
  papersAndCardboard?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  @Transform(NumberTransformer)
  hazardous?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  @Transform(NumberTransformer)
  others?: number;

  @Validate(WasteDistribution100Validator)
  get _validateTotal() {
    return true;
  }
}
