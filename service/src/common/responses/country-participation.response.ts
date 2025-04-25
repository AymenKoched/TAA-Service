import { BaseResponseModel } from '../base';
import { ApiProperty } from '../decorators';

export class CountryParticipationResponse extends BaseResponseModel {
  @ApiProperty()
  country!: string;

  @ApiProperty()
  count!: number;
}
