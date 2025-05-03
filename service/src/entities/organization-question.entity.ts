import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'organization_questions' })
export class OrganizationQuestion extends BaseEntity {
  keyPrefix = 'org_qst_';

  @ApiProperty()
  @Expose()
  @Column()
  question!: string;

  @ApiProperty()
  @Expose()
  @Column()
  response!: string;

  @ApiProperty()
  @Expose()
  @Column({ nullable: true })
  details?: string;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
  })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.questions)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
