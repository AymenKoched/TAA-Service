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
import { CountryParticipation } from './country-participation.entity';
import { OrganizationActivity } from './organization-activity.entity';
import { OrganizationAgeKpi } from './organization-age-kpi.entity';
import { OrganizationAttribute } from './organization-attribute.entity';
import { OrganizationClient } from './organization-client.entity';
import { OrganizationContract } from './organization-contract.entity';
import { OrganizationEmployeeKpi } from './organization-employee-kpi.entity';
import { OrganizationFormationKpi } from './organization-formation-kpi.entity';
import { OrganizationInitiative } from './organization-initiative.entity';
import { OrganizationRAndDProject } from './organization-rd-project.entity';
import { OrganizationResearchDevelopment } from './organization-research-development.entity';
import { OrganizationRevenueKpi } from './organization-revenue-kpi.entity';
import { OrganizationSite } from './organization-site.entity';
import { OrganizationTag } from './organization-tag.entity';
import { OrganizationTurnover } from './organization-turnover.entity';
import { OrganizationTurnoverDistribution } from './organization-turnover-distribution.entity';
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
  @Type(() => OrganizationTag)
  @OneToMany(() => OrganizationTag, (tag) => tag.organization)
  tags?: OrganizationTag[];

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

  @ApiProperty()
  @Expose()
  @Type(() => OrganizationEmployeeKpi)
  @OneToMany(() => OrganizationEmployeeKpi, (kpi) => kpi.organization)
  employeesKpis?: OrganizationEmployeeKpi[];

  @ApiProperty()
  @Expose()
  @Type(() => OrganizationContract)
  @OneToMany(() => OrganizationContract, (contract) => contract.organization)
  contracts?: OrganizationContract[];

  @ApiProperty()
  @Expose()
  @Type(() => OrganizationRevenueKpi)
  @OneToMany(() => OrganizationRevenueKpi, (revenue) => revenue.organization)
  revenueKpis?: OrganizationRevenueKpi[];

  @ApiProperty()
  @Expose()
  @Type(() => OrganizationAgeKpi)
  @OneToOne(() => OrganizationAgeKpi, (kpi) => kpi.organization)
  ageKpis?: OrganizationAgeKpi;

  @ApiProperty()
  @Expose()
  @Type(() => OrganizationFormationKpi)
  @OneToOne(
    () => OrganizationFormationKpi,
    (formation) => formation.organization,
  )
  formationKpi?: OrganizationFormationKpi;

  @ApiProperty()
  @Expose()
  @Type(() => OrganizationTurnoverDistribution)
  @OneToMany(
    () => OrganizationTurnoverDistribution,
    (turnover) => turnover.organization,
  )
  turnoverDistribution?: OrganizationTurnoverDistribution[];

  @ApiProperty()
  @Expose()
  @Type(() => OrganizationClient)
  @OneToMany(() => OrganizationClient, (client) => client.organization)
  clientsTypes?: OrganizationClient[];

  @ApiProperty()
  @Expose()
  @Type(() => OrganizationTurnover)
  @OneToOne(() => OrganizationTurnover, (turnover) => turnover.organization)
  turnover?: OrganizationTurnover;

  @ApiProperty()
  @Expose()
  @Type(() => CountryParticipation)
  @OneToMany(() => CountryParticipation, (country) => country.organization)
  countriesParticipation?: CountryParticipation[];

  @ApiProperty()
  @Expose()
  @Type(() => OrganizationAttribute)
  @OneToMany(() => OrganizationAttribute, (attribute) => attribute.organization)
  attributes?: OrganizationAttribute[];

  @ApiProperty()
  @Expose()
  @Type(() => OrganizationResearchDevelopment)
  @OneToOne(() => OrganizationResearchDevelopment, (rd) => rd.organization)
  researchDevelopment?: OrganizationResearchDevelopment;

  @ApiProperty()
  @Expose()
  @Type(() => OrganizationRAndDProject)
  @OneToMany(() => OrganizationRAndDProject, (project) => project.organization)
  rAndDProjects?: OrganizationRAndDProject[];

  @ApiProperty()
  @Expose()
  @Type(() => OrganizationInitiative)
  @OneToMany(
    () => OrganizationInitiative,
    (initiative) => initiative.organization,
  )
  initiatives?: OrganizationInitiative[];
}
