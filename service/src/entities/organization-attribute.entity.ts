import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { OrganizationAttributeType } from '../common/enums/organization-attribute-type.enum';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_attributes' })
export class OrganizationAttribute extends BaseEntity {
  keyPrefix = 'org_attr_';

  @ApiProperty()
  @Expose()
  @Column()
  name!: string;

  @ApiProperty()
  @Expose()
  @Column()
  value!: string;

  @ApiProperty()
  @Expose()
  @Column({
    type: 'enum',
    enum: OrganizationAttributeType,
  })
  type!: OrganizationAttributeType;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
  })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.attributes)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
