export const isNotNullish = (
  object: unknown
): object is Record<string, unknown> => {
  return object != null
}
