import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { Organization } from './organization.entity';

@Entity({ name: 'countries_participation' })
@Index('unique_organizationId_country', ['organizationId', 'country'], {
  unique: true,
  where: `deleted_at is null`,
})
export class CountryParticipation extends BaseEntity {
  keyPrefix = 'cntr_part_';

  @ApiProperty()
  @Expose()
  @Column()
  country!: string;

  @ApiProperty()
  @Expose()
  @Column()
  count!: number;

  @ApiProperty()
  @Expose()
  @Column({ name: 'organization_id' })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @ManyToOne(
    () => Organization,
    (organization) => organization.countriesParticipation,
  )
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
