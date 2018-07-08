export function rowsApart(index1: number, index2: number) {
  const r1 = Math.floor(index1 / 8);
  const r2 = Math.floor(index2 / 8);
  return Math.abs(r1 - r2);
}
