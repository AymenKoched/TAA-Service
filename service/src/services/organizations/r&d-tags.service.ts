import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { RAndDSiteTag } from '../../entities';
import { RDTagsRepository } from '../../repositories';

@Injectable()
export class RDTagsService extends CrudService<RAndDSiteTag> {
  protected notFoundErrorKey = AuthErrors.OrganizationTagNotFound;
  protected notFoundErrorMessage = 'The searched organization tag is not found';

  constructor(private rdTags: RDTagsRepository) {
    super(rdTags);
  }
}
