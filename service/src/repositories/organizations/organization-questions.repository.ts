import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { OrganizationQuestion } from '../../entities';

@Injectable()
export class OrganizationQuestionsRepository extends BaseRepository<OrganizationQuestion> {
  entityType = OrganizationQuestion;
}
