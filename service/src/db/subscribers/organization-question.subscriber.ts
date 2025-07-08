import { Injectable } from '@nestjs/common';

import { OrganizationQuestion } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class OrganizationQuestionSubscriber extends BaseReclamationSubscriber<OrganizationQuestion> {
  protected readonly entityCtor = OrganizationQuestion;
  protected readonly entityName = OrganizationQuestion.name;
}
