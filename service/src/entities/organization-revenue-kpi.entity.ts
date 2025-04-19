import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_revenue_kpis' })
@Index('unique_rev_kpi_organizationId_type', ['organizationId', 'type'], {
  unique: true,
  where: `deleted_at is null`,
})
export class OrganizationRevenueKpi extends BaseEntity {
  keyPrefix = 'org_rvu_kpi_';

  @ApiProperty()
  @Expose()
  @Column({
    length: 150,
  })
  type!: string;

  @ApiProperty()
  @Expose()
  @Column()
  men!: number;

  @ApiProperty()
  @Expose()
  @Column()
  women!: number;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
  })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.revenueKpis)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
