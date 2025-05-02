import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_waste_distributions' })
export class OrganizationWasteDistribution extends BaseEntity {
  keyPrefix = 'org_wst_dst_';

  @ApiProperty()
  @Expose()
  @Column({ name: 'plastic', nullable: true })
  plastic?: number;

  @ApiProperty()
  @Expose()
  @Column({ name: 'metallic', nullable: true })
  metallic?: number;

  @ApiProperty()
  @Expose()
  @Column({ name: 'textiles_and_leather', nullable: true })
  textilesAndLeather?: number;

  @ApiProperty()
  @Expose()
  @Column({ name: 'oils', nullable: true })
  oils?: number;

  @ApiProperty()
  @Expose()
  @Column({ name: 'papers_and_cardboard', type: 'int', nullable: true })
  papersAndCardboard?: number;

  @ApiProperty()
  @Expose()
  @Column({ name: 'hazardous', nullable: true })
  hazardous?: number;

  @ApiProperty()
  @Expose()
  @Column({ name: 'others', nullable: true })
  others?: number;

  @ApiProperty()
  @Expose()
  @Column({ name: 'organization_id' })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @OneToOne(
    () => Organization,
    (organization) => organization.wasteDistribution,
  )
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
