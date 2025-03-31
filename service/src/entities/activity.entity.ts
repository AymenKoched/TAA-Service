import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, Index, OneToMany } from 'typeorm';

import { BaseEntity } from '../common';
import { OrganizationActivity } from './organization-activity.entity';

@Entity({ name: 'activities' })
export class Activity extends BaseEntity {
  keyPrefix = 'actv_';

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
  })
  @Index({ unique: true, where: `deleted_at is null and name <> ''` })
  name!: string;

  @ApiProperty()
  @Expose()
  @Type(() => OrganizationActivity)
  @OneToMany(
    () => OrganizationActivity,
    (organizationActivity) => organizationActivity.activity,
  )
  activityOrganizations?: OrganizationActivity[];
}
