// Can't pass so far
// Related issue: https://github.com/newcat/baklavajs/issues/379
import { mount } from "@vue/test-utils";
import UnitInput from "./UnitInput.vue";
import { FUnit } from "../../math/FUnit";
import { FQuantity } from "../../math/FQuantity";
import { expect, test } from "vitest";
import ElementPlus from "element-plus";

test("Display", async () => {
  let u = new FUnit(
    new Map([
      ["m", 1],
      ["s", -2],
    ])
  );
  const wrapper = mount(UnitInput, {
    props: {
      modelValue: new FQuantity(1, u),
    },
    global: {
      plugins: [ElementPlus],
    },
  });
  const label = wrapper.get('[data-test="unit-label"]');
  expect(label.text()).toBe("1.000 m s^-2");

  // Change u to a dimensionless unit
  u = FUnit.one();
  await wrapper.setProps({ modelValue: new FQuantity(1, u) });
  expect(label.text()).toBe("1.000");
});

test("Input", async () => {
  let u = new FUnit(
    new Map([
      ["m", 1],
      ["s", -2],
    ])
  );
  const wrapper = mount(UnitInput, {
    props: {
      modelValue: new FQuantity(1, u),
      "onUpdate:modelValue": (v: FQuantity) => {
        wrapper.setProps({ modelValue: v });
      },
    },
    global: {
      plugins: [ElementPlus], // 修改这里
    },
  });

  const input_m = wrapper.get('[data-test="unit-input-box-1"]').get("input");
  const input_s = wrapper.get('[data-test="unit-input-box-2"]').get("input");
  const input_kg = wrapper.get('[data-test="unit-input-box-3"]').get("input");
  const input_number = wrapper
    .get('[data-test="unit-input-box-number"]')
    .get("input");

  const label = wrapper.get('[data-test="unit-label"]');

  // Change the value
  await input_m.setValue("2");
  expect(label.text()).toBe("1.000 m^2 s^-2");
  await input_s.setValue("3");
  expect(label.text()).toBe("1.000 m^2 s^3");
  await input_number.setValue("3");
  expect(label.text()).toBe("3.000 m^2 s^3");
  await input_kg.setValue("1");
  expect(label.text()).toBe("3.000 m^2 s^3 kg");
  await wrapper.setProps({ modelValue: new FQuantity(1, FUnit.one()) });
  expect(label.text()).toBe("1.000");
  expect((input_s.element as HTMLInputElement).value).toBe("0");
});
