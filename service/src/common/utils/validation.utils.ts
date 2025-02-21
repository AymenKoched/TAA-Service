import { isArray, ValidationError } from 'class-validator';
import { isEmpty } from 'lodash';

export function parseValidationErrors(
  validationErrors: ValidationError[],
): Record<string, string> {
  const computePath = (e: ValidationError, path: string) => {
    return path ? `${path}.${e.property}` : e.property;
  };

  const convertError = (
    e: ValidationError,
    path = '',
  ): Record<string, string> => {
    if (e.children?.length) {
      return (e.children || []).reduce((acc, item) => {
        return { ...acc, ...convertError(item, computePath(e, path)) };
      }, {});
    }

    if (isEmpty(e.constraints)) {
      return {};
    }

    return Object.values(e.constraints || []).reduce(
      (acc, value: string) => ({ ...acc, [computePath(e, path)]: value }),
      {},
    );
  };

  const errorReducer = (acc: Record<string, string>, item: ValidationError) => {
    return { ...acc, ...convertError(item) };
  };

  return (isArray(validationErrors) ? validationErrors : []).reduce(
    errorReducer,
    {},
  );
}
