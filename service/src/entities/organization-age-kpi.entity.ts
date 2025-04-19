import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { AgeRange, BaseEntity } from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_age_kpis' })
@Index('unique_organizationId_range', ['organizationId', 'ageRange'], {
  unique: true,
  where: `deleted_at is null`,
})
export class OrganizationAgeKpi extends BaseEntity {
  keyPrefix = 'org_age_kpi_';

  @ApiProperty()
  @Expose()
  @Column({ name: 'age_range', type: 'enum', enum: AgeRange })
  ageRange!: AgeRange;

  @ApiProperty()
  @Expose()
  @Column()
  count!: number;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
  })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.ageKpis)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
