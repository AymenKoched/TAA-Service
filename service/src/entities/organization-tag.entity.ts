import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity, OrganizationTagType } from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_tags' })
export class OrganizationTag extends BaseEntity {
  keyPrefix = 'org_tag_';

  @ApiProperty()
  @Expose()
  @Column()
  name!: string;

  @ApiProperty()
  @Expose()
  @Column({
    type: 'enum',
    enum: OrganizationTagType,
  })
  type!: OrganizationTagType;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
  })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.tags)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
