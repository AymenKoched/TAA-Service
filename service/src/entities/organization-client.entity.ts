import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_clients' })
@Index('unique_client_organizationId_type', ['organizationId', 'type'], {
  unique: true,
  where: `deleted_at is null`,
})
export class OrganizationClient extends BaseEntity {
  keyPrefix = 'org_clt_';

  @ApiProperty()
  @Expose()
  @Column()
  type!: string;

  @ApiProperty()
  @Expose()
  @Column()
  count!: number;

  @ApiProperty()
  @Expose()
  @Column()
  example!: string;

  @ApiProperty()
  @Expose()
  @Column()
  country!: string;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
  })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.clientsTypes)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
