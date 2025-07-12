import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity, OrganizationFieldsAccess } from '../common';
import { ClientRequest } from './client-request.entity';
import { UserSubscription } from './user-subscription.entity';

@Entity({ name: 'subscriptions' })
export class Subscription extends BaseEntity {
  keyPrefix = 'subs_';

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
  })
  name!: string;

  @ApiProperty()
  @Expose()
  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @ApiProperty()
  @Expose()
  @Column({
    nullable: true,
  })
  price?: number;

  @ApiProperty()
  @Expose()
  @Column({
    type: 'simple-array',
  })
  organizationHiddenFields!: OrganizationFieldsAccess[];

  @ApiProperty()
  @Expose()
  @Type(() => ClientRequest)
  @OneToMany(() => ClientRequest, (clientRequest) => clientRequest.subscription)
  requests?: ClientRequest[];

  @ApiProperty()
  @Expose()
  @Type(() => UserSubscription)
  @OneToMany(
    () => UserSubscription,
    (userSubscription) => userSubscription.subscription,
  )
  clients?: UserSubscription[];
}
