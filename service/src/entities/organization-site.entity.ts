import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { OrganizationSiteType } from '../common/enums/organization-site-type.enum';
import { Organization } from './organization.entity';

@Index(
  'unique_name_organization-type',
  ['name', 'organizationId', 'type', 'deletedAt'],
  { unique: true },
)
@Entity({ name: 'organization_sites' })
export class OrganizationSite extends BaseEntity {
  keyPrefix = 'org_ste_';

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
  })
  name!: string;

  @Expose()
  @ApiProperty()
  @Column()
  capacity!: number;

  @ApiProperty()
  @Expose()
  @Column({
    type: 'enum',
    enum: OrganizationSiteType,
  })
  type!: OrganizationSiteType;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
  })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.sites)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
