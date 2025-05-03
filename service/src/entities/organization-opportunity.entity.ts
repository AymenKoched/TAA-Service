import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import {
  BaseEntity,
  OrganizationOpportunityCategory,
  OrganizationOpportunityPriority,
} from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_opportunities' })
export class OrganizationOpportunity extends BaseEntity {
  keyPrefix = 'org_opp_';

  @ApiProperty()
  @Expose()
  @Column({ type: 'enum', enum: OrganizationOpportunityCategory })
  category!: OrganizationOpportunityCategory;

  @ApiProperty()
  @Expose()
  @Column({ length: 500, nullable: true })
  description?: string;

  @ApiProperty()
  @Expose()
  @Column({ type: 'enum', enum: OrganizationOpportunityPriority })
  priority!: OrganizationOpportunityPriority;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
  })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.opportunities)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
