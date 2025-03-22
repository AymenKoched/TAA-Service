import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  BeforeInsert,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { getRandomString } from '../utils';
import { BaseModel } from './base.model';

export abstract class BaseEntity extends BaseModel {
  protected abstract keyPrefix: string;

  @ApiProperty()
  @PrimaryColumn()
  @Expose()
  id!: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  @Expose()
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  @Expose()
  updatedAt!: Date;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  @Expose()
  deletedAt!: Date;

  @BeforeInsert()
  onBeforeInsert() {
    if (!this.id) {
      this.id = getRandomString(20, this.keyPrefix);
    }
  }
}
