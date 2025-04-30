import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_initiatives' })
export class OrganizationInitiative extends BaseEntity {
  keyPrefix = 'org_init_';

  @ApiProperty()
  @Expose()
  @Column()
  name!: string;

  @ApiProperty()
  @Expose()
  @Column()
  impact!: string;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
  })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.initiatives)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
