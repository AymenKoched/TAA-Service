import { BaseResponseModel } from '../base';
import { ApiProperty, ApiPropertyOptional } from '../decorators';
import {
  UserReclamationPriority,
  UserReclamationState,
  UserReclamationType,
} from '../enums';

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
}
