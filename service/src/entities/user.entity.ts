import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  ChildEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  TableInheritance,
} from 'typeorm';

import { BaseEntity, UserType } from '../common';
import { Organization } from './organization.entity';
import { UserRole } from './user-role.entity';
import { UserToken } from './user-token.entity';

@Entity({ name: 'users' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class User extends BaseEntity {
  keyPrefix = 'usr_';

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
  @Index({ unique: true, where: `deleted_at is null and email <> ''` })
  email!: string;

  @Exclude()
  @ApiProperty()
  @Column({
    length: 100,
  })
  password!: string;

  @ApiProperty()
  @Expose()
  @Column({ name: 'user_type', type: 'enum', enum: UserType })
  userType!: UserType;

  @ApiProperty()
  @Expose()
  @Column({ name: 'inscription_date', type: 'date', nullable: true })
  inscriptionDate?: Date;

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
  @Type(() => UserRole)
  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles?: UserRole[];

  @ApiProperty()
  @Expose()
  @Column({
    name: 'is_active',
    type: Boolean,
    nullable: false,
    default: true,
  })
  isActive!: boolean;

  @ApiProperty()
  @Expose()
  @Type(() => UserToken)
  @OneToMany(() => UserToken, (token) => token.user)
  tokens?: UserToken[];
}

@ChildEntity(UserType.Admin)
export class Admin extends User {
  keyPrefix = 'adm_';
}

@ChildEntity(UserType.Client)
export class Client extends User {
  keyPrefix = 'clt_';
}

@ChildEntity(UserType.Adherent)
export class Adherent extends User {
  keyPrefix = 'adhr_';

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
  })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @OneToOne(() => Organization, (organization) => organization.adherent)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
    nullable: true,
  })
  position?: string;
}
