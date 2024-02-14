import { expect, test } from "vitest";
import { FUnit } from "./FUnit";
import { FQuantity } from "./FQuantity";
import { parseUnit } from "./ParseUnit";

test("parseUnit", () => {
  expect(parseUnit("kg/m^2").toString()).toBe("1.000 m^-2 kg");
  expect(parseUnit("m s *kg").toString()).toBe("1.000 m s kg");
  expect(parseUnit("m^-2 /kg^-1.5").toString()).toBe("1.000 m^-2 kg^1.5");
});
