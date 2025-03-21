import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity({ name: 'user_roles' })
export class UserRole extends BaseEntity {
  keyPrefix = 'usr_role_';

  @ApiProperty()
  @Expose()
  @Column({
    name: 'user_id',
    nullable: false,
  })
  userId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => User)
  @ManyToOne(() => User, (user) => user.roles)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'role_id',
    nullable: false,
  })
  roleId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Role)
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role!: Role;
}
