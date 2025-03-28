import { Transform, Type } from 'class-transformer';

import { BaseResponseModel } from '../base';
import { ApiProperty, ApiPropertyOptional } from '../decorators';
import { ModelTransformer } from '../transformers';
import { TagResponse } from './tag.response';
import { AdherentResponse } from './user.response';

export class OrganizationResponse extends BaseResponseModel {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiPropertyOptional()
  adherentId?: string;

  @ApiPropertyOptional()
  @Type(() => AdherentResponse)
  @Transform(ModelTransformer(() => AdherentResponse))
  adherent?: AdherentResponse;

  @ApiPropertyOptional()
  fullName?: string;

  @ApiPropertyOptional()
  headOffice?: string;

  @ApiPropertyOptional()
  taxNumber?: string;

  @ApiPropertyOptional()
  websiteUrl?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  @Transform(ModelTransformer(() => TagResponse))
  @Type(() => TagResponse)
  rAndDSites?: TagResponse[];

  @ApiPropertyOptional()
  @Transform(ModelTransformer(() => TagResponse))
  @Type(() => TagResponse)
  otherLocations?: TagResponse[];

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  postalCode?: string;

  @ApiPropertyOptional()
  city?: string;

  @ApiPropertyOptional()
  country?: string;

  @ApiPropertyOptional()
  foundingYear?: number;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  legalStatus?: string;

  @ApiPropertyOptional()
  groupAffiliation?: string;

  @ApiPropertyOptional()
  linkedin?: string;

  @ApiPropertyOptional()
  facebook?: string;

  @ApiPropertyOptional()
  twitter?: string;
}
