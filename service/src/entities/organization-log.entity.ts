import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { UserReclamation } from './user-reclamation.entity';

@Entity({ name: 'logs' })
export class Log extends BaseEntity {
  keyPrefix = 'log_';

  @ApiProperty()
  @Expose()
  @Column()
  entity!: string;

  @ApiProperty()
  @Expose()
  @Column()
  entityId!: string;

  @ApiProperty()
  @Expose()
  @Column({ type: 'json' })
  before!: Record<string, any>;

  @ApiProperty()
  @Expose()
  @Column({ type: 'json' })
  after!: Record<string, any>;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'reclamation_id',
  })
  reclamationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => UserReclamation)
  @ManyToOne(() => UserReclamation, (reclamation) => reclamation.logs)
  @JoinColumn({ name: 'reclamation_id' })
  reclamation!: UserReclamation;
}
