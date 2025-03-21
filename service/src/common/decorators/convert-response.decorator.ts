import { applyDecorators, SetMetadata } from '@nestjs/common';

import { ModelConstructor } from '../base';

export const CONVERT_RESPONSE_TYPE = 'convert_response_type';
export function ConvertResponse(type: ModelConstructor) {
  return applyDecorators(SetMetadata(CONVERT_RESPONSE_TYPE, type));
}
