import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BeforeInsert, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryColumn()
  @Expose()
  id: string;

  @BeforeInsert()
  onBeforeInsert() {
    if (!this.id) {
      this.id = getRandomString(20, 'user');
    }
  }
}

function getRandomString(length: number, prefix = ''): string {
  const str = 'abcdefghijklopqrstuvwxyzABCDEFGHIJKLOPQRSTUVWXYZ0123456789';
  return prefix.concat(
    [...new Array(length)]
      .map(() => str[Math.floor(Math.random() * str.length + 1)])
      .join(''),
  );
}
