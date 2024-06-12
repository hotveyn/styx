export const getJSONContent = <T extends { additionalData: string | null }>(
  entity: T
) => {
  if (entity?.additionalData) {
    return { text: entity?.additionalData || "" };
  }

  return { json: entity?.additionalData || {} };
};
