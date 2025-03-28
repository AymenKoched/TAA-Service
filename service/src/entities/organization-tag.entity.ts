import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  TableInheritance,
} from 'typeorm';

import { BaseEntity, OrganizationTagType } from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_tags' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class OrganizationTag extends BaseEntity {
  keyPrefix = 'org_tag_';

  @ApiProperty()
  @Expose()
  @Column()
  name!: string;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
  })
  organizationId!: string;
}

@ChildEntity(OrganizationTagType.RAndD)
export class RAndDSiteTag extends OrganizationTag {
  keyPrefix = 'org_tag_';

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.rAndDSites)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}

@ChildEntity(OrganizationTagType.OtherLocations)
export class OtherLocationsTag extends OrganizationTag {
  keyPrefix = 'org_tag_';

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.otherLocations)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
