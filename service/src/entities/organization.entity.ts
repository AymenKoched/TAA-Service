import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { BaseEntity } from '../common';
import { OrganizationActivity } from './organization-activity.entity';
import { OrganizationSite } from './organization-site.entity';
import { OtherLocationsTag, RAndDSiteTag } from './organization-tag.entity';
import { Product } from './product.entity';
import { Adherent } from './user.entity';

@Entity({ name: 'organizations' })
export class Organization extends BaseEntity {
  keyPrefix = 'org_';

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
  })
  name!: string;

  @ApiProperty()
  @Expose()
  @Column({
    length: 200,
  })
  @Index({ unique: true, where: `deleted_at is null and email <> ''` })
  email!: string;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'adherent_id',
    nullable: true,
  })
  adherentId?: string;

  @ApiProperty()
  @Expose()
  @Type(() => Adherent)
  @OneToOne(() => Adherent, (adherent) => adherent.organization)
  @JoinColumn({ name: 'adherent_id' })
  adherent?: Adherent;

  @ApiProperty()
  @Expose()
  @Column({
    length: 150,
    nullable: true,
    name: 'full_name',
  })
  fullName?: string;

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
    name: 'head_office',
    nullable: true,
  })
  headOffice?: string;

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
    name: 'tax_number',
    nullable: true,
  })
  taxNumber?: string;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'website_url',
    nullable: true,
    length: 150,
  })
  websiteUrl?: string;

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
    nullable: true,
  })
  @Index({ unique: true, where: `deleted_at is null and phone <> ''` })
  phone?: string;

  @ApiProperty()
  @Expose()
  @Type(() => RAndDSiteTag)
  @OneToMany(() => RAndDSiteTag, (site) => site.organization)
  rAndDSites?: RAndDSiteTag[];

  @ApiProperty()
  @Expose()
  @Type(() => OtherLocationsTag)
  @OneToMany(() => OtherLocationsTag, (location) => location.organization)
  otherLocations?: OtherLocationsTag[];

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
    nullable: true,
  })
  address?: string;

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
    name: 'postal_code',
    nullable: true,
  })
  postalCode?: string;

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
    nullable: true,
  })
  city?: string;

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
    nullable: true,
  })
  country?: string;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'founding_year',
    nullable: true,
  })
  foundingYear?: number;

  @ApiProperty()
  @Expose()
  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
    name: 'legal_status',
    nullable: true,
  })
  legalStatus?: string;

  @ApiProperty()
  @Expose()
  @Column({
    length: 150,
    name: 'group_affiliation',
    nullable: true,
  })
  groupAffiliation?: string;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'linkedin_url',
    type: String,
    nullable: true,
    length: 150,
  })
  linkedin?: string;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'facebook_url',
    type: String,
    nullable: true,
    length: 150,
  })
  facebook?: string;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'twitter_url',
    type: String,
    nullable: true,
    length: 150,
  })
  twitter?: string;

  @ApiProperty()
  @Expose()
  @Type(() => Product)
  @OneToMany(() => Product, (product) => product.organization)
  products?: Product[];

  @ApiProperty()
  @Expose()
  @Type(() => OrganizationSite)
  @OneToMany(() => OrganizationSite, (site) => site.organization)
  sites?: OrganizationSite[];

  @ApiProperty()
  @Expose()
  @Type(() => OrganizationActivity)
  @OneToMany(
    () => OrganizationActivity,
    (organizationActivity) => organizationActivity.organization,
  )
  organizationActivities?: OrganizationActivity[];
}
