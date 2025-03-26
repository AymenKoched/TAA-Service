import { NotFoundException } from '@nestjs/common';
import { isArray, isEmpty } from 'lodash';
import { FindOptionsWhere, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { BaseEntity } from './base.entity';
import { BaseRepository } from './base.repository';
import {
  DeepPartial,
  GetQuery,
  PagedResult,
  SearchQuery,
  SearchResult,
} from './search.model';

export interface CrudGetOptions {
  silent?: boolean;
  search?: DeepPartial<GetQuery>;
  relationLoadStrategy?: 'join' | 'query';
}

export abstract class CrudService<TEntity extends BaseEntity = BaseEntity> {
  protected abstract notFoundErrorKey: string;
  protected abstract notFoundErrorMessage: string;

  constructor(private readonly repository: BaseRepository<TEntity>) {}

  async search<TResult extends SearchResult<TEntity> = SearchResult<TEntity>>(
    filter: SearchQuery | SearchQuery[],
    loadingStrategy?: 'join' | 'query',
  ): Promise<SearchResult<TEntity>> {
    const search = filter[0] || filter;
    const result = await this.repository.search(filter, {}, loadingStrategy);
    if (!search.findOne) {
      return result as TResult;
    }

    let empty: boolean;
    if (result instanceof PagedResult) {
      empty = isEmpty(result.items);
    } else {
      empty = isEmpty(result[0]);
    }

    if (search.silent !== true && empty) {
      throw new NotFoundException(
        this.notFoundErrorKey,
        this.notFoundErrorMessage,
      );
    }

    return result;
  }

  async create(
    entity: QueryDeepPartialEntity<TEntity> | DeepPartial<TEntity>[],
  ): Promise<TEntity> {
    const ctor = this.repository.entityType;
    const data = isArray(entity)
      ? entity.map((e) => new ctor(e))
      : new ctor(entity);
    return this.repository.repo.save(data);
  }

  async findOne(
    criteria: FindOptionsWhere<TEntity>,
    opts?: CrudGetOptions,
  ): Promise<TEntity> {
    const entity = await this.repository.findOne(
      criteria,
      opts?.search,
      opts?.relationLoadStrategy,
    );
    if (!entity && !opts?.silent) {
      throw new NotFoundException(
        this.notFoundErrorKey,
        this.notFoundErrorMessage,
      );
    }

    return entity as TEntity;
  }

  async getById(
    id: string,
    opts: {
      silent: true;
      search?: DeepPartial<GetQuery>;
      relationLoadStrategy?: 'join' | 'query';
    },
  ): Promise<TEntity | null>;

  async getById(
    id: string,
    opts: {
      silent: false | undefined;
      search?: DeepPartial<GetQuery>;
      relationLoadStrategy?: 'join' | 'query';
    },
  ): Promise<TEntity>;

  async getById(
    id: string,
    opts: {
      search?: DeepPartial<GetQuery>;
      relationLoadStrategy?: 'join' | 'query';
    },
  ): Promise<TEntity>;

  async getById(id: string): Promise<TEntity>;

  async getById(id: string, opts?: CrudGetOptions): Promise<TEntity | null> {
    return this.findOne({ id } as FindOptionsWhere<TEntity>, opts);
  }

  async delete(id: string, opts?: CrudGetOptions): Promise<TEntity> {
    const toBeDeleted = await this.getById(id, opts as any);
    if (!toBeDeleted && !opts?.silent) {
      throw new NotFoundException(
        this.notFoundErrorKey,
        this.notFoundErrorMessage,
      );
    }

    toBeDeleted.deletedAt = new Date();

    return this.repository.repo.save(toBeDeleted);
  }

  async update(
    id: string,
    partial: QueryDeepPartialEntity<TEntity>,
    opts?: CrudGetOptions,
  ): Promise<TEntity> {
    const found = await this.repository.repo.preload(
      new this.repository.entityType({ id, ...partial }),
    );
    if (!found && !opts?.silent) {
      throw new NotFoundException(
        this.notFoundErrorKey,
        this.notFoundErrorMessage,
      );
    }
    return this.repository.repo.save(found);
  }

  async updateByIds(
    ids: string[],
    partial: QueryDeepPartialEntity<TEntity>,
  ): Promise<UpdateResult> {
    return await this.repository.updateByIds(ids, partial);
  }

  async updateById(
    id: string,
    partial: QueryDeepPartialEntity<TEntity>,
  ): Promise<UpdateResult> {
    return this.repository.updateById(id, partial);
  }
  async updateByCriteria(
    criteria: FindOptionsWhere<TEntity>,
    partial: QueryDeepPartialEntity<TEntity>,
  ): Promise<TEntity | TEntity[]> {
    return this.repository.updateByCriteria(criteria, partial);
  }

  async deleteByCriteria(
    criteria: FindOptionsWhere<TEntity>,
  ): Promise<TEntity[]> {
    return this.repository.deleteByCriteria(criteria);
  }

  async deleteByIds(ids: string[]): Promise<TEntity[]> {
    return this.repository.deleteByIds(ids);
  }

  async deleteById(id: string): Promise<TEntity> {
    const res = await this.deleteByIds([id]);
    return res?.[0];
  }
}
