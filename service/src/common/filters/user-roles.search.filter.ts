import { SearchQuery } from '../base';
import { ApiPropertyOptional, IsOptional } from '../decorators';

export class UserRolesSearchFilter extends SearchQuery {
  @ApiPropertyOptional()
  @IsOptional()
  roleId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  userId?: string;
}
