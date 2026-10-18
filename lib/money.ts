export function formatCents(cents: number): string {
  if (!Number.isInteger(cents)) {
    throw new TypeError(`Expected integer cents, received ${cents}`);
  }

  const sign = cents < 0 ? "-" : "";
  const absolute = Math.abs(cents);
  const units = Math.floor(absolute / 100);
  const remainder = String(absolute % 100).padStart(2, "0");

  return `${sign}${units}.${remainder}`;
}
