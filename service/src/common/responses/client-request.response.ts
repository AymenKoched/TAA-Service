import { Transform, Type } from 'class-transformer';

import { BaseResponseModel } from '../base';
import { ApiProperty, ApiPropertyOptional } from '../decorators';
import { ModelTransformer, PhoneTransformer } from '../transformers';
import { SubscriptionResponse } from './subscription.response';

export class ClientRequestResponse extends BaseResponseModel {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiPropertyOptional()
  @Transform(PhoneTransformer)
  phone?: string;

  @ApiPropertyOptional()
  location?: string;

  @ApiProperty()
  subscriptionId!: string;

  @ApiPropertyOptional()
  @Type(() => SubscriptionResponse)
  @Transform(ModelTransformer(() => SubscriptionResponse))
  subscription?: SubscriptionResponse;
}
