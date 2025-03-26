import { Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  filter,
  forEach,
  identity,
  isArray,
  isEmpty,
  isNull,
  map,
  omit,
  reduce,
  set,
} from 'lodash';
import {
  Between,
  DataSource,
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { BaseEntity } from './base.entity';
import { EntityConstructor } from './constructors';
import {
  GreaterThanOperator,
  GreaterThanOrEqualOperator,
  LessThanOperator,
  LessThanOrEqualOperator,
  LikeOperator,
  SearchOperator,
} from './operators.model';
import {
  DeepPartial,
  GetQuery,
  PagedResult,
  SearchQuery,
  SearchResult,
} from './search.model';

const logger = new Logger('Entity');

const OperatorsMap = {
  [LikeOperator.name]: ILike,
  [GreaterThanOperator.name]: MoreThan,
  [LessThanOperator.name]: LessThan,
  [GreaterThanOrEqualOperator.name]: MoreThanOrEqual,
  [LessThanOrEqualOperator.name]: LessThanOrEqual,
};

export abstract class BaseRepository<TEntity extends BaseEntity = BaseEntity> {
  public abstract entityType: EntityConstructor;

  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async search(
    filters: SearchQuery | SearchQuery[],
    criteria: FindOptionsWhere<TEntity> = {},
    relationLoadStrategy: 'join' | 'query' = 'join',
  ): Promise<SearchResult<TEntity>> {
    const search = filters[0] || filters;
    const options = this.buildOptions(filters, criteria, relationLoadStrategy);

    if (SearchQuery.hasPagination(search)) {
      const { skip, take } = options;
      const [items, total] = await this.repo.findAndCount(options);
      return new PagedResult<TEntity>({ items, total, skip, take });
    }

    return this.repo.find(options);
  }

  findOne(
    criteria: FindOptionsWhere<TEntity>,
    filters?: DeepPartial<GetQuery>,
    relationLoadStrategy: 'join' | 'query' = 'join',
  ): Promise<TEntity | null> {
    return this.repo.findOne(
      this.buildOptions(
        new SearchQuery(filters),
        criteria,
        relationLoadStrategy,
      ),
    );
  }

  findById(
    id: string,
    filters?: DeepPartial<GetQuery>,
  ): Promise<TEntity | null> {
    const criteria = { id } as FindOptionsWhere<TEntity>;
    return this.findOne(criteria, filters);
  }

  async updateById(
    id: string,
    partialEntity: QueryDeepPartialEntity<TEntity>,
  ): Promise<UpdateResult> {
    const criteria = { id } as FindOptionsWhere<TEntity>;
    const result = await this.repo.update(criteria, { ...partialEntity, id });
    if (!result.affected) {
      logger.log(
        `[${this.entityType.name}] UPDATE : No matching rows where found for update`,
      );
    } else {
      logger.log(
        `[${this.entityType.name}] UPDATE : ${
          result.affected
        } rows have been updated with the following data ${JSON.stringify(
          partialEntity,
        )}`,
      );
    }
    return result;
  }

  async updateByIds(
    ids: string[],
    partialEntity: QueryDeepPartialEntity<TEntity>,
  ): Promise<UpdateResult> {
    const criteria = {
      id: In(isArray(ids) ? ids : [ids]),
    } as FindOptionsWhere<TEntity>;
    const result = await this.repo.update(criteria, partialEntity);

    if (!result.affected) {
      logger.log(
        `[${this.constructor.name}] UPDATE : No matching rows where found for update`,
      );
    } else {
      logger.log(
        `[${this.constructor.name}] UPDATE : ${
          result.affected
        } rows have been updated with the following data ${JSON.stringify(
          partialEntity,
        )}`,
      );
    }

    return result;
  }

  async deleteByIds(ids: string[]): Promise<TEntity[]> {
    return this.deleteByCriteria({ id: In(ids) as any });
  }

  async deleteByCriteria(
    criteria: FindOptionsWhere<TEntity>,
  ): Promise<TEntity[]> {
    const entities = await this.repo.find({ where: criteria });
    forEach(entities, (e) => {
      e.deletedAt = new Date();
    });
    return this.repo.save(entities);
  }

  async updateByCriteria(
    criteria: FindOptionsWhere<TEntity> | FindOptionsWhere<TEntity>[],
    partialEntity: QueryDeepPartialEntity<TEntity>,
  ): Promise<TEntity | TEntity[]> {
    const items = await this.repo.find({ where: criteria });
    if (items.length === 1) {
      return this.repo.save({ ...items[0], ...partialEntity });
    }
    return this.repo.save(
      map(items, (item) => ({ ...item, ...partialEntity })),
    );
  }

  async saveOrIgnore(
    _entities: TEntity[] | TEntity,
    fieldsToCheck?: Array<keyof TEntity>,
  ): Promise<[TEntity[], TEntity[]]> {
    const entities = isArray(_entities) ? _entities : [_entities];

    const saveOne = async (entity: TEntity): Promise<[TEntity, boolean]> => {
      const criteria = reduce(
        fieldsToCheck,
        (acc, field) => ({ ...acc, [field]: entity[field] }),
        {},
      );

      const existing = await this.findOne(
        (!isEmpty(criteria)
          ? criteria
          : { id: entity.id }) as FindOptionsWhere<TEntity>,
      );

      if (existing) {
        logger.log(
          `Entity already exists with this criteria ${JSON.stringify(
            criteria,
          )}`,
        );

        return [{ ...entity, ...existing }, true];
      }

      return [{ ...entity, ...(await this.repo.save(entity)) }, false];
    };

    const result = await Promise.all(map(entities, (e) => saveOne(e)));

    const saved = map(
      filter(result, (r) => !r[1]),
      (r) => r[0],
    );
    const ignored = map(
      filter(result, (r) => r[1]),
      (r) => r[0],
    );

    return [saved, ignored];
  }

  private buildOptions(
    search?: SearchQuery | SearchQuery[],
    criteria?: FindOptionsWhere<TEntity>,
    relationLoadStrategy?: 'join' | 'query',
  ): FindManyOptions<TEntity> {
    const filters = search[0] || search;

    const buildWhereClause = (condition?: SearchQuery) => {
      let createdAt;
      if (condition?.to && condition?.from) {
        createdAt = Between(condition?.from, condition?.to);
      } else if (condition?.from) {
        createdAt = MoreThanOrEqual(condition?.from);
      } else if (condition?.to) {
        createdAt = LessThanOrEqual(condition?.to);
      }

      const res = {
        ...(createdAt && { createdAt }),
        ...(condition?.ids && { id: In(condition?.ids) }),
        ...this.buildWhereClauseFromFilters(condition),
        ...criteria,
      };

      return Object.keys(res).length ? res : undefined;
    };

    return {
      withDeleted: filters?.withDeleted,
      skip: filters?.skip,
      take: filters?.take,
      order: this.buildOrder(filters?.sort),
      relations: this.buildRelations(filters?.expands),
      relationLoadStrategy,
      where: isArray(search)
        ? map(search, buildWhereClause).filter(identity).length
          ? map(search, buildWhereClause).filter(identity)
          : undefined
        : buildWhereClause(search),
    };
  }

  get repo(): Repository<TEntity> {
    return this.dataSource.getRepository(this.entityType);
  }

  private buildOrder(sort: string[]): FindOptionsOrder<TEntity> {
    const sortReducer = (acc: FindOptionsOrder<TEntity>, sort: string) => {
      if (isEmpty(sort)) {
        return acc;
      }
      const parts = sort.split(':');
      return set(acc, parts[0], parts[1]?.toLocaleLowerCase?.() || 'asc');
    };
    return sort?.reduce(sortReducer, {});
  }

  private buildRelations(expands: string[]): FindOptionsRelations<TEntity> {
    const res = {};
    expands?.forEach((expand) => set(res, expand, true));
    return res;
  }

  private buildWhereClauseFromFilters(
    search?: SearchQuery,
  ): FindOptionsWhere<TEntity> {
    if (!search) {
      return {};
    }

    const filters = omit(search, SearchQuery.BASIC_FILTERS);
    const res = {};
    Object.keys(filters).forEach((key) => {
      let value;
      if (isNull(filters[key])) {
        value = IsNull();
      } else if (isArray(filters[key])) {
        value = In(filters[key]);
      } else if (filters[key] instanceof SearchOperator) {
        const operator = OperatorsMap[filters[key].constructor.name];
        value = operator(filters[key].value);
      } else {
        value = filters[key];
      }
      set(res, key, value);
    });
    return res;
  }
}
