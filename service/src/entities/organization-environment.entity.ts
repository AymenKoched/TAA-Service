import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_environments' })
export class OrganizationEnvironment extends BaseEntity {
  keyPrefix = 'org_env_';

  @ApiProperty()
  @Expose()
  @Column({ name: 'electricity', nullable: true, length: 200 })
  electricity?: string;

  @ApiProperty()
  @Expose()
  @Column({ name: 'electricity_consumption', nullable: true, length: 100 })
  electricityConsumption?: string;

  @ApiProperty()
  @Expose()
  @Column({ name: 'has_water_plant', nullable: true, default: false })
  hasWaterPlant?: boolean;

  @ApiProperty()
  @Expose()
  @Column({ name: 'water_consumption', nullable: true, length: 100 })
  waterConsumption?: string;

  @ApiProperty()
  @Expose()
  @Column({ name: 'recyclable_percentage', nullable: true, length: 100 })
  recyclablePercentage?: string;

  @ApiProperty()
  @Expose()
  @Column({ name: 'eco_designed', nullable: true })
  ecoDesigned?: boolean;

  @ApiProperty()
  @Expose()
  @Column({ name: 'internal_revaluation', nullable: true })
  internalRevaluation?: boolean;

  @ApiProperty()
  @Expose()
  @Column({ name: 'local_recovery_rate', nullable: true, length: 100 })
  localRecoveryRate?: string;

  @ApiProperty()
  @Expose()
  @Column({ name: 'export_rate', nullable: true, length: 100 })
  exportRate?: string;

  @ApiProperty()
  @Expose()
  @Column({ name: 'production_integration_rate', nullable: true, length: 100 })
  productionIntegrationRate?: string;

  @ApiProperty()
  @Expose()
  @Column({ name: 'has_develop_products', nullable: true })
  hasDevelopProducts?: boolean;

  @ApiProperty()
  @Expose()
  @Column({ name: 'has_develop_processes', nullable: true })
  hasDevelopProcesses?: boolean;

  @ApiProperty()
  @Expose()
  @Column({ name: 'has_develop_markets', nullable: true })
  hasDevelopMarkets?: boolean;

  @ApiProperty()
  @Expose()
  @Column({ name: 'has_open_innovation', nullable: true })
  hasOpenInnovation?: boolean;

  @ApiProperty()
  @Expose()
  @Column({ name: 'technical_know_how', nullable: true, type: 'text' })
  technicalKnowHow?: string;

  @ApiProperty()
  @Expose()
  @Column({ name: 'organization_id' })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @OneToOne(() => Organization, (organization) => organization.environment)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
