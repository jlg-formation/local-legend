export const merge = <T extends { id: number }>(
  newObjects: T[],
  existingObjects: T[]
): T[] => {
  const map = new Map<number, T>();
  for (const o of existingObjects) {
    map.set(o.id, o);
  }
  for (const o of newObjects) {
    map.set(o.id, o);
  }
  return [...map.values()];
};
