import { SearchQuery } from '../base';
import { ApiPropertyOptional, IsOptional } from '../decorators';

export class UserSubscriptionSearchFilter extends SearchQuery {
  @ApiPropertyOptional()
  @IsOptional()
  clientId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  subscriptionId?: string;
}
