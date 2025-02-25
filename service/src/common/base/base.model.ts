import 'reflect-metadata';

import { pick } from 'lodash';

export type ModelConstructor<T = any> = new (raw?: any) => T;

export abstract class BaseModel {
  constructor(rawData: any = {}, cleanUndeclaredProperties = true) {
    const filtered = cleanUndeclaredProperties
      ? pick(rawData, BaseModel.getDeclaredProperties(this))
      : rawData;
    const defineProperty = (key: string, value: any): void => {
      Object.defineProperty(this, key, {
        writable: true,
        enumerable: true,
        configurable: true,
        value,
      });
    };

    Object.keys(filtered).forEach((field: string) => {
      const nativeValue = filtered[field];
      defineProperty(field, nativeValue);
    });
  }

  static getDeclaredProperties(self: BaseModel): string[] {
    return Reflect.getMetadata('swagger/apiModelPropertiesArray', self)?.map(
      (item: string) => item.substring(1),
    );
  }
}
