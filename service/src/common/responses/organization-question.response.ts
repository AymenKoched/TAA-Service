import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';

export class OrganizationQuestionResponse extends BaseResponseModel {
  @ApiProperty()
  question?: string;

  @ApiProperty()
  response?: string;

  @ApiProperty()
  details?: string;
}
