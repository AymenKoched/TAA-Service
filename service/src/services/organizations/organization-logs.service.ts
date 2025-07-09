import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { Log } from '../../entities';
import { OrganizationLogsRepository } from '../../repositories';

@Injectable()
export class OrganizationLogsService extends CrudService<Log> {
  protected notFoundErrorKey = AuthErrors.LogNotFound;
  protected notFoundErrorMessage = 'The searched log is not found';

  constructor(private readonly myRepo: OrganizationLogsRepository) {
    super(myRepo);
  }
}
