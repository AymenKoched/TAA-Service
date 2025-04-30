import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_researches_developments' })
export class OrganizationResearchDevelopment extends BaseEntity {
  keyPrefix = 'org_rd_';

  @ApiProperty()
  @Expose()
  @Column({ name: 'budget_2024', nullable: true })
  budget2024?: number;

  @ApiProperty()
  @Expose()
  @Column({ name: 'patents_count', nullable: true })
  patentsCount?: number;

  @ApiProperty()
  @Expose()
  @Column({ name: 'revenue_percentage', nullable: true })
  revenuePercentage?: number;

  @ApiProperty()
  @Expose()
  @Column({ name: 'university_partnerships', type: 'boolean', nullable: true })
  universityPartnerships?: boolean;

  @ApiProperty()
  @Expose()
  @Column({ name: 'projects_in_progress', nullable: true })
  projectsInProgress?: number;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
  })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @OneToOne(
    () => Organization,
    (organization) => organization.researchDevelopment,
  )
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
