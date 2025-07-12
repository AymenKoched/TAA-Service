import { SearchQuery } from '../base';
import { ApiPropertyOptional, IsOptional } from '../decorators';

export class RolesSearchFilter extends SearchQuery {
  @ApiPropertyOptional()
  @IsOptional()
  isAdminRole?: boolean;
}
