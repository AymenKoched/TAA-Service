import { Transform, Type } from 'class-transformer';

import { BaseResponseModel } from '../base';
import { ApiProperty, ApiPropertyOptional } from '../decorators';
import {
  UserReclamationPriority,
  UserReclamationState,
  UserReclamationType,
} from '../enums';
import { ModelTransformer } from '../transformers';
import { AdherentResponse } from './user.response';

export class UserReclamationResponse extends BaseResponseModel {
  @ApiProperty()
  type!: UserReclamationType;

  @ApiPropertyOptional()
  priority?: UserReclamationPriority;

  @ApiPropertyOptional()
  state?: UserReclamationState;

  @ApiProperty()
  startDate!: Date;

  @ApiProperty()
  windowDays!: number;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  fileUrl?: string;

  @ApiPropertyOptional()
  @Type(() => AdherentResponse)
  @Transform(ModelTransformer(() => AdherentResponse))
  adherent?: AdherentResponse;
}
