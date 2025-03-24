import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, Index, OneToMany } from 'typeorm';

import { BaseEntity, RoleAccess } from '../common';
import { UserRole } from './user-role.entity';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  keyPrefix = 'rle_';

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
  })
  @Index({ unique: true, where: `deleted_at is null` })
  name!: string;

  @ApiProperty()
  @Expose()
  @Column({
    type: 'enum',
    enum: RoleAccess,
    array: true,
    default: [],
  })
  accesses!: RoleAccess[];

  @ApiProperty()
  @Expose()
  @Type(() => UserRole)
  @OneToMany(() => UserRole, (userRole) => userRole.role)
  roleUsers?: UserRole[];
}
