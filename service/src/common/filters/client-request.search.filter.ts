import { Transform, Type } from 'class-transformer';
import { IsString } from 'class-validator';

import { LikeOperator, SearchQuery } from '../base';
import { ApiPropertyOptional, IsOptional } from '../decorators';

export class ClientRequestSearchFilter extends SearchQuery {
  @ApiPropertyOptional()
  @Transform(({ value }) => new LikeOperator(value))
  @Type(() => LikeOperator)
  @IsOptional()
  name?: LikeOperator;

  @ApiPropertyOptional()
  @Transform(({ value }) => new LikeOperator(value))
  @Type(() => LikeOperator)
  @IsOptional()
  email?: LikeOperator;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  subscriptionId?: string;
}
