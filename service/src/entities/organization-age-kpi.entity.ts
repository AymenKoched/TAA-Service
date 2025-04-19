import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_age_kpis' })
export class OrganizationAgeKpi extends BaseEntity {
  keyPrefix = 'org_age_kpi_';

  @ApiProperty()
  @Expose()
  @Column({ name: 'count_18_24', type: 'int', default: 0 })
  count18_24!: number;

  @ApiProperty()
  @Expose()
  @Column({ name: 'count_25_30', type: 'int', default: 0 })
  count25_30!: number;

  @ApiProperty()
  @Expose()
  @Column({ name: 'count_31_36', type: 'int', default: 0 })
  count31_36!: number;

  @ApiProperty()
  @Expose()
  @Column({ name: 'count_37_plus', type: 'int', default: 0 })
  count37Plus!: number;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
  })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @OneToOne(() => Organization, (organization) => organization.ageKpis)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
