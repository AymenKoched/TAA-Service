import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { OrganizationQuestion } from '../../entities';
import { OrganizationQuestionsRepository } from '../../repositories';

@Injectable()
export class OrganizationQuestionsService extends CrudService<OrganizationQuestion> {
  protected notFoundErrorKey = AuthErrors.OrganizationQuestionNotFound;
  protected notFoundErrorMessage =
    'The searched organization question is not found';

  constructor(private readonly myRepo: OrganizationQuestionsRepository) {
    super(myRepo);
  }
}
