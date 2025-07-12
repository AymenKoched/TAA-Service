import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { Subscription } from './subscription.entity';

@Entity({ name: 'client_requests' })
export class ClientRequest extends BaseEntity {
  keyPrefix = 'clt_req_';

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
  })
  name!: string;

  @ApiProperty()
  @Expose()
  @Column({
    length: 200,
  })
  email!: string;

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
    nullable: true,
  })
  @Index({ unique: true, where: `deleted_at is null and phone <> ''` })
  phone?: string;

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
    nullable: true,
  })
  location?: string;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'subscription_id',
  })
  subscriptionId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Subscription)
  @ManyToOne(() => Subscription, (subscription) => subscription.requests)
  @JoinColumn({ name: 'subscription_id' })
  subscription!: Subscription;

  @ApiProperty()
  @Expose()
  @Column({ name: 'duration_days', nullable: true })
  durationDays?: number;
}
