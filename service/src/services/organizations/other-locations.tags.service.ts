import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OtherLocationsTag } from '../../entities';
import { OtherLocationsTagsRepository } from '../../repositories';

@Injectable()
export class OtherLocationsTagsService extends CrudService<OtherLocationsTag> {
  protected notFoundErrorKey = AuthErrors.OrganizationTagNotFound;
  protected notFoundErrorMessage = 'The searched organization tag is not found';

  constructor(private otherLocations: OtherLocationsTagsRepository) {
    super(otherLocations);
  }
}
