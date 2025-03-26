import 'reflect-metadata';

import { isUndefined, negate, pickBy } from 'lodash';

const METADATA_FACTORY_NAME = '_OPENAPI_METADATA_FACTORY';

const DECORATORS_PREFIX = 'swagger';
export const SWAGGER_DECORATORS = {
  API_MODEL_PROPERTIES: `${DECORATORS_PREFIX}/apiModelProperties`,
  API_MODEL_PROPERTIES_ARRAY: `${DECORATORS_PREFIX}/apiModelPropertiesArray`,
};

export type ApiPropertyOptions = {
  type?: (...args: unknown[]) => unknown;
  required?: boolean;
  isArray?: boolean;
};

export function createPropertyDecorator(
  metaKey: string,
  opts?: ApiPropertyOptions,
): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    const properties =
      Reflect.getMetadata(
        SWAGGER_DECORATORS.API_MODEL_PROPERTIES_ARRAY,
        target,
      ) || [];

    const key = `:${String(propertyKey)}`;
    if (!properties.includes(key)) {
      Reflect.defineMetadata(
        SWAGGER_DECORATORS.API_MODEL_PROPERTIES_ARRAY,
        [...properties, `:${String(propertyKey)}`],
        target,
      );
    }

    const existingMetadata = Reflect.getMetadata(metaKey, target, propertyKey);
    if (existingMetadata) {
      const newMetadata = pickBy(opts, negate(isUndefined));
      Reflect.defineMetadata(
        metaKey,
        {
          ...existingMetadata,
          ...newMetadata,
          required: opts?.required === false || true,
          isArray: opts?.isArray === true || false,
        },
        target,
        propertyKey,
      );
    } else {
      const type =
        target?.constructor?.[METADATA_FACTORY_NAME]?.()[propertyKey]?.type ??
        Reflect.getMetadata('design:type', target, propertyKey);

      Reflect.defineMetadata(
        metaKey,
        {
          type,
          ...pickBy(opts, negate(isUndefined)),
          required: opts?.required === false || true,
          isArray: opts?.isArray === true || false,
        },
        target,
        propertyKey,
      );
    }
  };
}

export function ApiProperty(opts?: ApiPropertyOptions): PropertyDecorator {
  return createPropertyDecorator(SWAGGER_DECORATORS.API_MODEL_PROPERTIES, opts);
}

export function ApiPropertyOptional(
  opts?: ApiPropertyOptions,
): PropertyDecorator {
  return createPropertyDecorator(SWAGGER_DECORATORS.API_MODEL_PROPERTIES, {
    ...opts,
    required: false,
  });
}
