import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import {
  BaseEntity,
  UserReclamationPriority,
  UserReclamationState,
  UserReclamationType,
} from '../common';
import { Adherent } from './user.entity';

@Entity({ name: 'users_reclamations' })
export class UserReclamation extends BaseEntity {
  keyPrefix = 'rclm_';

  @ApiProperty()
  @Expose()
  @Column({ type: 'enum', enum: UserReclamationType })
  type!: UserReclamationType;

  @ApiProperty()
  @Expose()
  @Column({ type: 'enum', nullable: true, enum: UserReclamationPriority })
  priority?: UserReclamationPriority;

  @ApiProperty()
  @Expose()
  @Column({ type: 'enum', enum: UserReclamationState })
  state!: UserReclamationState;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'start_date',
  })
  startDate!: Date;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'window_days',
  })
  windowDays!: number;

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
    name: 'file_url',
    nullable: true,
  })
  fileUrl?: string;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'adherent_id',
    nullable: false,
  })
  adherentId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Adherent)
  @ManyToOne(() => Adherent, (adherent) => adherent.reclamations)
  @JoinColumn({ name: 'adherent_id' })
  adherent!: Adherent;
}
