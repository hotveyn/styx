export const deleteEmptyKeys = <T>(
  entity: T,
  keys: (keyof typeof entity)[]
) => {
  for (const key of keys) {
    if (
      entity[key] === "" ||
      entity[key] === null ||
      entity[key] === undefined
    ) {
      delete entity[key];
    }
  }
};
