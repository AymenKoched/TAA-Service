import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationTag } from '../../entities';
import { OrganizationTagsRepository } from '../../repositories';

@Injectable()
export class OrganizationTagsService extends CrudService<OrganizationTag> {
  protected notFoundErrorKey = AuthErrors.OrganizationTagNotFound;
  protected notFoundErrorMessage = 'The searched organization tag is not found';

  constructor(private tags: OrganizationTagsRepository) {
    super(tags);
  }
}
