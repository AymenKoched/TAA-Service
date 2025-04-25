import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_turnovers' })
export class OrganizationTurnover extends BaseEntity {
  keyPrefix = 'org_tnr_';

  @ApiProperty()
  @Expose()
  @Column({ type: 'decimal', nullable: true })
  revenue2024?: number;

  @ApiProperty()
  @Expose()
  @Column({ default: false, nullable: true })
  hasGrowthComparedTo2023?: boolean;

  @ApiProperty()
  @Expose()
  @Column({ nullable: true })
  growthRate?: number;

  @ApiProperty()
  @Expose()
  @Column({ nullable: true })
  rAndDInvestment2023?: number;

  @ApiProperty()
  @Expose()
  @Column({ nullable: true })
  grantsReceived?: number;

  @ApiProperty()
  @Expose()
  @Column({ nullable: true })
  productionVolume?: number;

  @ApiProperty()
  @Expose()
  @Column({ name: 'organization_id' })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @OneToOne(() => Organization, (organization) => organization.turnover)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
