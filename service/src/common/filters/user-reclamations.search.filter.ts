import { Type } from 'class-transformer';

import { SearchQuery } from '../base';
import { ApiPropertyOptional, IsOptional } from '../decorators';
import {
  UserReclamationPriority,
  UserReclamationState,
  UserReclamationType,
} from '../enums';

export class UserReclamationsSearchFilter extends SearchQuery {
  @ApiPropertyOptional()
  @IsOptional()
  type?: UserReclamationType;

  @ApiPropertyOptional()
  @IsOptional()
  priority?: UserReclamationPriority;

  @ApiPropertyOptional()
  @IsOptional()
  state?: UserReclamationState;

  @ApiPropertyOptional()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  adherentId?: string;
}
