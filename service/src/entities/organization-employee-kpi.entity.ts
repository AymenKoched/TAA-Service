import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { EmployeesKpiType } from '../common/enums/employees-kpi-type.enum';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_employees_kpis' })
@Index('unique_emp_kpi_organizationId_type', ['organizationId', 'type'], {
  unique: true,
  where: `deleted_at is null`,
})
export class OrganizationEmployeeKpi extends BaseEntity {
  keyPrefix = 'org_emp_kpi_';

  @ApiProperty()
  @Expose()
  @Column({ type: 'enum', enum: EmployeesKpiType })
  type!: EmployeesKpiType;

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
  @ManyToOne(() => Organization, (organization) => organization.employeesKpis)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
