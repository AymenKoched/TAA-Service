import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { Organization } from './organization.entity';

@Index('unique_product_name_organization', ['name', 'organizationId'], {
  unique: true,
  where: `deleted_at is null and name <> ''`,
})
@Entity({ name: 'products' })
export class Product extends BaseEntity {
  keyPrefix = 'prd_';

  @ApiProperty()
  @Expose()
  @Column({
    length: 100,
  })
  name!: string;

  @ApiProperty()
  @Expose()
  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Expose()
  @ApiProperty()
  @Column()
  ngp!: string;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'organization_id',
  })
  organizationId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.products)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization;
}
