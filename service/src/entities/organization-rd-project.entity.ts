import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_r&d_projects' })
export class OrganizationRAndDProject extends BaseEntity {
  keyPrefix = 'org_rd_proj_';

  @ApiProperty()
  @Expose()
  @Column()
  name!: string;

  @ApiProperty()
  @Expose()
  @Column({ nullable: true })
  description?: string;

  @ApiProperty()
  @Expose()
  @Column({ nullable: true })
  objectif?: string;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
  })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.rAndDProjects)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
