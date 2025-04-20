import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_formation_kpis' })
export class OrganizationFormationKpi extends BaseEntity {
  keyPrefix = 'org_fmt_kpi_';

  @ApiProperty()
  @Expose()
  @Column({
    name: 'men_hours',
    nullable: true,
  })
  menHours?: number;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'women_hours',
    nullable: true,
  })
  womenHours?: number;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'main_formation',
    nullable: true,
  })
  mainFormation?: string;

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
    nullable: true,
  })
  location?: string;

  @ApiProperty()
  @Expose()
  @Column({
    length: 150,
    nullable: true,
  })
  type?: string;

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
    nullable: true,
    name: 'employees_trained',
  })
  employeesTrained?: string;

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
    nullable: true,
    name: 'revenue_investment',
  })
  revenueInvestment?: string;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
  })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @OneToOne(() => Organization, (organization) => organization.formationKpi)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
