import { BaseEntity } from '../base';

export type Constructor<T = any> = new () => T;

export type RawConstructor<T = any> = new (raw: any) => T;

export type EntityConstructor<T = any> = RawConstructor<T> &
  Partial<typeof BaseEntity>;
