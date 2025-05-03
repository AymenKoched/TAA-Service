export function computeCompletion(fields: unknown[]): number {
  const total = fields.length;

  if (total === 0) return 0;

  const filled = fields.filter(
    (field) =>
      field !== undefined &&
      field !== null &&
      (!Array.isArray(field) || field.length > 0) &&
      (typeof field !== 'string' || field.trim() !== ''),
  ).length;

  return Math.round((filled / total) * 100);
}
