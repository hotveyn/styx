export function BetterBigInt(property: any) {
  if (property === null) return null;

  try {
    return BigInt(property);
  } catch (e) {
    return undefined;
  }
}
