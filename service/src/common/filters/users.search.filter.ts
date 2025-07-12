import { IsString } from 'class-validator';

import { SearchQuery } from '../base';
import { ApiPropertyOptional, IsOptional } from '../decorators';

export class UsersSearchFilter extends SearchQuery {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'errors:field.invalid' })
  name?: string;
}
