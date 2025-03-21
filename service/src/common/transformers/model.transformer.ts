import {
  instanceToPlain,
  plainToInstance,
  TransformFnParams,
} from 'class-transformer';
import { isArray, isString } from 'lodash';

import { BaseModel, ModelConstructor } from '../base';

export const ModelTransformer =
  (
    ctorFn: (
      params?: Partial<TransformFnParams>,
    ) => ModelConstructor | [ModelConstructor, any],
  ) =>
  (params: TransformFnParams): BaseModel | BaseModel[] => {
    const { value, obj } = params;

    const result = ctorFn({ value, obj });
    const newValue = isArray(result) ? result[1] : value;
    const ctor = (isArray(result) ? result[0] : result) as ModelConstructor;

    try {
      const plainValue = isString(newValue) ? JSON.parse(newValue) : newValue;
      if (!ctor || !newValue) {
        return value;
      }

      return isArray(plainValue)
        ? plainValue.map(
            (v) => new ctor(plainToInstance(ctor, instanceToPlain(v))),
          )
        : new ctor(plainToInstance(ctor, instanceToPlain(plainValue)));
    } catch (e) {
      return value;
    }
  };
