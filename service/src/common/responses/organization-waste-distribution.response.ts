import { BaseResponseModel } from '../base';
import { ApiPropertyOptional } from '../decorators';

export class OrganizationWasteDistributionResponse extends BaseResponseModel {
  @ApiPropertyOptional()
  plastic?: number;

  @ApiPropertyOptional()
  metallic?: number;

  @ApiPropertyOptional()
  textilesAndLeather?: number;

  @ApiPropertyOptional()
  oils?: number;

  @ApiPropertyOptional()
  papersAndCardboard?: number;

  @ApiPropertyOptional()
  hazardous?: number;

  @ApiPropertyOptional()
  others?: number;
}
