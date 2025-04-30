import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity, OrganizationContractType } from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_contracts' })
@Index('unique_contract_organizationId_type', ['organizationId', 'type'], {
  unique: true,
  where: `deleted_at is null`,
})
export class OrganizationContract extends BaseEntity {
  keyPrefix = 'org_cnt_';

  @ApiProperty()
  @Expose()
  @Column({
    type: 'enum',
    enum: OrganizationContractType,
  })
  type!: OrganizationContractType;

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
  @ManyToOne(() => Organization, (organization) => organization.contracts)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
