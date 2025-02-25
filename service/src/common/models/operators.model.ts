import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { BaseModel } from '../base';

export type SearchOperatorValue = string[] | string | number | Date | undefined;

export class SearchOperator<T = any> extends BaseModel {
  @ApiProperty()
  value!: SearchOperatorValue;

  @ApiPropertyOptional()
  metadata?: T;

  constructor(val: SearchOperatorValue, metadata?: T) {
    super();
    if (val instanceof Date) {
      this.value = val.toISOString();
    } else {
      this.value = val;
    }
    this.metadata = metadata;
  }
}

export class LikeOperator extends SearchOperator {
  constructor(val: SearchOperatorValue) {
    super(val);
    this.value = `%${String(this.value).toLowerCase()}%`;
  }
}
export class GreaterThanOperator extends SearchOperator {}
export class LessThanOperator extends SearchOperator {}
export class GreaterThanOrEqualOperator extends SearchOperator {}
export class LessThanOrEqualOperator extends SearchOperator {}
