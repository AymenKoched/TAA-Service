import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { Subscription } from './subscription.entity';
import { Client } from './user.entity';

@Entity({ name: 'user_subscriptions' })
export class UserSubscription extends BaseEntity {
  keyPrefix = 'usr_subs_';

  @ApiProperty()
  @Expose()
  @Column({
    name: 'client_id',
  })
  clientId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Client)
  @ManyToOne(() => Client, (client) => client.subscriptions)
  @JoinColumn({ name: 'client_id' })
  client!: Client;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'subscription_id',
  })
  subscriptionId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Subscription)
  @ManyToOne(() => Subscription, (subscription) => subscription.clients)
  @JoinColumn({ name: 'subscription_id' })
  subscription!: Subscription;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'activation_date',
    nullable: false,
  })
  activationDate!: Date;

  @ApiProperty()
  @Expose()
  @Column({ name: 'duration_days' })
  durationDays!: number;
}
