import { InjectDataSource } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { pick } from 'lodash';
import {
  DataSource,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import {
  AdherentResponse,
  EntityConstructor,
  RequestContext,
  UserType,
} from '../../common';
import {
  AuthService,
  OrganizationLogsService,
  OrganizationsService,
} from '../../services';

export abstract class BaseReclamationSubscriber<T>
  implements EntitySubscriberInterface<T>
{
  protected abstract readonly entityCtor: EntityConstructor;
  protected abstract readonly entityName: string;

  protected doAfterInsert = true;
  protected doBeforeUpdate = true;

  constructor(
    protected readonly auth: AuthService,
    protected readonly logs: OrganizationLogsService,
    protected readonly orgs: OrganizationsService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return this.entityCtor;
  }

  private async getReclamationId(): Promise<string> {
    const userId = RequestContext.currentContext()?.userId;
    if (!userId) return;

    const details = await this.auth.getUserDetailsById(userId);
    if (!details || details.userType !== UserType.Adherent) return;

    const user = new AdherentResponse(details.user);
    if (
      user.userType !== UserType.Adherent ||
      !user.isWithinModificationWindow ||
      !user.lastReclamationId
    ) {
      return;
    }

    return user.lastReclamationId;
  }

  async afterInsert(event: InsertEvent<T>) {
    if (!this.doAfterInsert) return;

    const recId = await this.getReclamationId();
    if (!recId) return;

    const entity = event.entity as any;
    if (!entity) return;

    const keys = [...Object.keys(entity), 'id'];
    const after = pick(instanceToPlain(entity), keys);

    await this.logs.create({
      entity: this.entityName,
      entityId: entity.id,
      before: {},
      after,
      reclamationId: recId,
    });
  }

  async beforeUpdate(event: UpdateEvent<T>) {
    if (!this.doBeforeUpdate) return;

    const recId = await this.getReclamationId();
    if (!recId) return;

    const id = event.entity?.id ?? (event.databaseEntity as any)?.id;
    if (!id) return;

    const beforeEntity =
      event.databaseEntity ?? (await this.orgs.getById(id, { silent: true }));
    if (!beforeEntity) return;

    const changes = event.entity || {};
    const diffKeys = Object.keys(changes);
    if (!diffKeys.length) return;

    const keysToPick = [...diffKeys, 'id'];
    const beforePlain = instanceToPlain(beforeEntity);

    const before = pick(beforePlain, keysToPick);
    const after =
      changes?.deletedAt == null
        ? pick({ ...beforePlain, ...changes }, keysToPick)
        : {};

    if (JSON.stringify(before) === JSON.stringify(after)) return;

    await this.logs.create({
      entity: this.entityName,
      entityId: id,
      before,
      after,
      reclamationId: recId,
    });
  }
}
