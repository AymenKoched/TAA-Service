import { Expose, Transform, Type } from 'class-transformer';
import { addDays, isBefore } from 'date-fns';

import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';
import { ModelTransformer } from '../transformers';
import { SubscriptionResponse } from './subscription.response';
import { ClientResponse } from './user.response';

export class UserSubscriptionResponse extends BaseResponseModel {
  @ApiProperty()
  deletedAt?: Date;

  @ApiProperty()
  clientId!: string;

  @ApiProperty()
  @Transform(ModelTransformer(() => ClientResponse))
  @Type(() => ClientResponse)
  client?: ClientResponse;

  @ApiProperty()
  subscriptionId!: string;

  @ApiProperty()
  @Transform(ModelTransformer(() => SubscriptionResponse))
  @Type(() => SubscriptionResponse)
  subscription?: SubscriptionResponse;

  @ApiProperty()
  activationDate!: Date;

  @ApiProperty()
  durationDays!: number;

  @ApiProperty()
  @Expose()
  get isActive(): boolean {
    const expiry = addDays(this.activationDate, this.durationDays);
    return (
      isBefore(new Date(), expiry) && !isBefore(new Date(), this.activationDate)
    );
  }
}
