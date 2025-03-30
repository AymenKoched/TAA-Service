import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity, OrganizationActivityType } from '../common';
import { Activity } from './activity.entity';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_activities' })
export class OrganizationActivity extends BaseEntity {
  keyPrefix = 'org_actv_';

  @ApiProperty()
  @Expose()
  @Column({
    type: 'enum',
    enum: OrganizationActivityType,
  })
  type!: OrganizationActivityType;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
    nullable: false,
  })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @ManyToOne(
    () => Organization,
    (organization) => organization.organizationActivities,
  )
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'activity_id',
    nullable: false,
  })
  activityId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Activity)
  @ManyToOne(() => Activity, (activity) => activity.activityOrganizations)
  @JoinColumn({ name: 'activity_id' })
  activity!: Activity;
}
