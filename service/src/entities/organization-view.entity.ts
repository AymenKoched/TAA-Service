import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity, OrganizationViewType } from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_views' })
export class OrganizationView extends BaseEntity {
  keyPrefix = 'org_view_';

  @ApiProperty()
  @Expose()
  @Column({
    name: 'view_url',
  })
  viewUrl!: string;

  @ApiProperty()
  @Expose()
  @Column({
    type: 'enum',
    enum: OrganizationViewType,
  })
  type!: OrganizationViewType;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
  })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.views)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
