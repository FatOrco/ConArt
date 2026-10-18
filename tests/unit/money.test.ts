import { describe, expect, it } from "vitest";
import { formatCents } from "../../lib/money";

describe("formatCents", () => {
  it("formats integer cents as a two-decimal amount", () => {
    expect(formatCents(1250)).toBe("12.50");
    expect(formatCents(5)).toBe("0.05");
    expect(formatCents(0)).toBe("0.00");
  });

  it("keeps the sign for negative amounts", () => {
    expect(formatCents(-199)).toBe("-1.99");
  });

  it("rejects non-integer values", () => {
    expect(() => formatCents(12.5)).toThrow(TypeError);
  });
});
