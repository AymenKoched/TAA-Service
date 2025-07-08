import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common';
import { UserTokenType } from '../common/enums/user-token-type.enum';
import { User } from './user.entity';

@Entity({ name: 'users_tokens' })
export class UserToken extends BaseEntity {
  keyPrefix = 'tkn_';

  @ApiProperty()
  @Expose()
  @Column()
  @Index({ unique: true, where: `deleted_at is null and token <> ''` })
  token!: string;

  @ApiProperty()
  @Expose()
  @Column({
    type: 'enum',
    enum: UserTokenType,
  })
  type!: UserTokenType;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'expiration_date',
    type: 'timestamp',
    nullable: true,
  })
  expirationDate?: Date;

  @ApiProperty()
  @Expose()
  @Column({
    name: 'user_id',
    nullable: false,
  })
  userId!: string;

  @ApiProperty()
  @Expose()
  @Type(() => User)
  @ManyToOne(() => User, (user) => user.tokens)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
