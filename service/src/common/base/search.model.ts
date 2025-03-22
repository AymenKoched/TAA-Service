import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBooleanString, IsNumber } from 'class-validator';
import {
  every,
  isArray,
  isBoolean,
  isEmpty,
  isNumber,
  isObject,
  isString,
  isUndefined,
  map,
  uniq,
} from 'lodash';

import { BaseModel, ModelConstructor } from '../base';
import { IsOptional } from '../decorators';
import { NumberArray, StringArray } from '../models';
import {
  BooleanTransformer,
  NumberTransformer,
  StringArrayTransformer,
} from '../transformers';
import { LikeOperator, SearchOperator } from './operators.model';

export type DeepPartial<T> =
  | T
  | (T extends Array<infer U>
      ? DeepPartial<U>[]
      : T extends Map<infer K, infer V>
      ? Map<DeepPartial<K>, DeepPartial<V>>
      : T extends Set<infer M>
      ? Set<DeepPartial<M>>
      : T extends object
      ? {
          [K in keyof T]?: DeepPartial<T[K]>;
        }
      : T);

export type SearchOptions = {
  filtersType?: ModelConstructor;
};

export type SearchType =
  | string
  | number
  | boolean
  | Date
  | StringArray
  | NumberArray
  | undefined
  | null;

export class PagedResult<TEntity> extends BaseModel {
  @ApiProperty()
  total!: number;

  @ApiProperty()
  items!: TEntity[];

  @ApiProperty()
  skip!: number;

  @ApiProperty()
  take!: number;
}

export type SearchResult<TEntity> = PagedResult<TEntity> | TEntity[];

export class GetQuery extends BaseModel {
  @ApiPropertyOptional()
  @Transform(StringArrayTransformer)
  @IsOptional()
  expands?: StringArray;

  @IsBooleanString({ message: 'errors:field.invalid' })
  @IsOptional()
  @ApiPropertyOptional()
  withDeleted?: boolean;
}

export class SearchQuery extends GetQuery {
  static BASIC_FILTERS: Array<keyof SearchQuery> = [
    'ids',
    'from',
    'expands',
    'sort',
    'skip',
    'to',
    'take',
    'withDeleted',
    'findOne',
    'silent',
    'query',
  ];
  @Transform(StringArrayTransformer)
  @IsOptional()
  @ApiPropertyOptional()
  ids?: StringArray;

  @Type(() => Date)
  @ApiPropertyOptional()
  @IsOptional()
  from?: Date;

  @Type(() => Date)
  @ApiPropertyOptional()
  @IsOptional()
  to?: Date;

  @ApiPropertyOptional()
  @Transform(NumberTransformer)
  @IsOptional()
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  skip?: number;

  @ApiPropertyOptional()
  @Transform(NumberTransformer)
  @IsOptional()
  @IsNumber(undefined, { message: 'errors:field.invalid' })
  take?: number;

  @Transform(StringArrayTransformer)
  @IsOptional()
  @ApiPropertyOptional()
  sort?: StringArray;

  @Transform(BooleanTransformer)
  @IsOptional()
  @ApiPropertyOptional()
  silent?: boolean;

  @Transform(BooleanTransformer)
  @IsOptional()
  @ApiPropertyOptional()
  findOne?: boolean;

  @IsOptional()
  @ApiPropertyOptional()
  query?: string;

  static emptyResult<T>(obj: DeepPartial<SearchQuery>): SearchResult<T> {
    return SearchQuery.hasPagination(obj)
      ? new PagedResult<T>({
          total: 0,
          skip: obj.skip,
          take: obj.take,
          items: [],
        })
      : [];
  }

  static hasPagination(obj: DeepPartial<SearchQuery>): boolean {
    return (!!obj.skip || obj.skip === 0) && !!obj.take;
  }

  static serializeObject(obj: any | undefined, encode = false): string {
    if (!obj) {
      return '';
    }
    return Object.keys(obj)
      .filter((key) => {
        const isEmptyArray = isArray(obj[key]) && isEmpty(obj[key]);
        if (isEmptyArray) {
          return false;
        }
        return (
          Boolean(obj[key]) ||
          obj[key] === 0 ||
          obj[key] === null ||
          obj[key] === false
        );
      })
      .map((key) => {
        return `${key}=${this.serializeValue(obj[key], encode)}`;
      })
      .join('&');
  }

  static serializeValue(value: SearchType, encode = false): string | undefined {
    if (isUndefined(value)) {
      return;
    }
    if (value instanceof Date) {
      return value.toISOString();
    }

    if (value instanceof SearchOperator) {
      return value.value?.toString();
    }
    if (SearchQuery.isPrimitivesArray(value)) {
      return uniq(map(value, (v) => this.serializeValue(v, true))).join(',');
    }

    if (isObject(value)) {
      return JSON.stringify(value);
    }

    if (isString(value) && encode) {
      return encodeURIComponent(value);
    }

    return String(value);
  }

  static isPrimitiveType(item: unknown) {
    return isBoolean(item) || isString(item) || isNumber(item);
  }

  private static isPrimitivesArray(array: unknown): array is boolean[] {
    return isArray(array) && every(array, (item) => this.isPrimitiveType(item));
  }

  static getQuery(search: SearchQuery, trim = true) {
    const query = trim ? search.query?.trim() : search.query;
    if (!query) {
      return undefined;
    }
    return new LikeOperator(query);
  }
}
