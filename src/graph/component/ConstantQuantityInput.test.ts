import { mount } from "@vue/test-utils";
import ConstantQuantityInput from "./ConstantQuantityInput.vue";
import { FUnit } from "../../math/FUnit";
import { FQuantity } from "../../math/FQuantity";
import { expect, test } from "vitest";
import ElementPlus from "element-plus";

test("Input", async () => {
  let q = new FQuantity(1, FUnit.one());
  const wrapper = mount(ConstantQuantityInput, {
    props: {
      modelValue: q,
      'onUpdate:modelValue': (v: FQuantity) => {
        wrapper.setProps({ modelValue: v });
      }
    },
    global: {
      plugins: [ElementPlus], // 修改这里
    },
  });

  const input = wrapper.get('[data-test="constant-quantity-input-box"]').get('input');
  const input_unit_number = wrapper.get('[data-test="unit-input-box-number"]').get('input');
  const input_m = wrapper.get('[data-test="unit-input-box-1"]').get('input');

  await input.setValue("2");
  expect(wrapper.props("modelValue")).toEqual(new FQuantity(2));
  await input_m.setValue("2");
  expect(wrapper.props("modelValue")).toEqual(new FQuantity(2, new FUnit(new Map([["m", 2]]))));
  await input_m.setValue("3");
  expect(wrapper.props("modelValue")).toEqual(new FQuantity(2, new FUnit(new Map([["m", 3]]))));
  await input_unit_number.setValue("3");
  expect(wrapper.props("modelValue")).toEqual(new FQuantity(6, new FUnit(new Map([["m", 3]]))));
  // Model value not affected
  // await wrapper.setProps({ modelValue: new FQuantity(13, FUnit.one()) });
  // expect(input.element.value).toBe("13");
  // expect(input_m.element.value).toBe("0");
  // expect(input_unit_number.element.value).toBe("1");
});
