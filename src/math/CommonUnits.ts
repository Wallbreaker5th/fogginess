import { FQuantity } from "./FQuantity";
import { FUnit } from "./FUnit";

const commonUnits_ = [
  {
    symbol: "m",
    value: 1,
    exponent: [["m", 1]],
  },
  {
    symbol: "s",
    value: 1,
    exponent: [["s", 1]],
  },
  {
    symbol: "g",
    value: 1e-3,
    exponent: [["kg", 1]],
  },
  {
    symbol: "A",
    value: 1,
    exponent: [["A", 1]],
  },
  {
    symbol: "K",
    value: 1,
    exponent: [["K", 1]],
  },
  {
    symbol: "mol",
    value: 1,
    exponent: [["mol", 1]],
  },
  {
    symbol: "cd",
    value: 1,
    exponent: [["cd", 1]],
  },
  {
    symbol: "Hz",
    value: 1,
    exponent: [["s", -1]],
  },
  {
    symbol: "N",
    value: 1,
    exponent: [
      ["m", 1],
      ["kg", 1],
      ["s", -2],
    ],
  },
  {
    symbol: "Pa",
    value: 1,
    exponent: [
      ["m", -1],
      ["kg", 1],
      ["s", -2],
    ],
  },
  {
    symbol: "J",
    value: 1,
    exponent: [
      ["m", 2],
      ["kg", 1],
      ["s", -2],
    ],
  },
  {
    symbol: "W",
    value: 1,
    exponent: [
      ["m", 2],
      ["kg", 1],
      ["s", -3],
    ],
  },
  {
    symbol: "C",
    value: 1,
    exponent: [
      ["s", 1],
      ["A", 1],
    ],
  },
  {
    symbol: "V",
    value: 1,
    exponent: [
      ["m", 2],
      ["kg", 1],
      ["s", -3],
      ["A", -1],
    ],
  },
  {
    symbol: "F",
    value: 1,
    exponent: [
      ["m", -2],
      ["kg", -1],
      ["s", 4],
      ["A", 2],
    ],
  },
  {
    symbol: "Ω",
    value: 1,
    exponent: [
      ["m", 2],
      ["kg", 1],
      ["s", -3],
      ["A", -2],
    ],
  },
  {
    symbol: "Ohm",
    value: 1,
    exponent: [
      ["m", 2],
      ["kg", 1],
      ["s", -3],
      ["A", -2],
    ],
  },
  {
    symbol: "S",
    value: 1,
    exponent: [
      ["m", -2],
      ["kg", -1],
      ["s", 3],
      ["A", 2],
    ],
  },
  {
    symbol: "Wb",
    value: 1,
    exponent: [
      ["m", 2],
      ["kg", 1],
      ["s", -2],
      ["A", -1],
    ],
  },
  {
    symbol: "T",
    value: 1,
    exponent: [
      ["kg", 1],
      ["s", -2],
      ["A", -1],
    ],
  },
  {
    symbol: "H",
    value: 1,
    exponent: [
      ["m", 2],
      ["kg", 1],
      ["s", -2],
      ["A", -2],
    ],
  },
  {
    symbol: "rad",
    value: 1,
    exponent: [],
  },
  {
    symbol: "deg",
    value: Math.PI / 180,
    exponent: [],
  },
  {
    symbol: "L",
    value: 1e-3,
    exponent: [["m", 3]],
  },
  {
    symbol: "mHg",
    value: 133.322 * 1e3,
    exponent: [
      ["m", -1],
      ["kg", 1],
      ["s", -2],
    ],
  },
  {
    symbol: "bar",
    value: 1e5,
    exponent: [
      ["m", -1],
      ["kg", 1],
      ["s", -2],
    ],
  },
  {
    symbol: "atm",
    value: 101325,
    exponent: [
      ["m", -1],
      ["kg", 1],
      ["s", -2],
    ],
  },
];

export const commonUnits = new Map<string, FQuantity>(
  commonUnits_.map((unit) => {
    return [
      unit.symbol,
      new FQuantity(
        unit.value,
        new FUnit(new Map(unit.exponent as [string, number][]))
      ),
    ];
  })
);

export const unitPrefixes = new Map<string, number>([
  ["Q", 1e30],
  ["R", 1e27],
  ["Y", 1e24],
  ["Z", 1e21],
  ["E", 1e18],
  ["P", 1e15],
  ["T", 1e12],
  ["G", 1e9],
  ["M", 1e6],
  ["k", 1e3],
  ["h", 1e2],
  ["d", 1e-1],
  ["c", 1e-2],
  ["m", 1e-3],
  ["μ", 1e-6],
  ["u", 1e-6],
  ["n", 1e-9],
  ["p", 1e-12],
  ["f", 1e-15],
  ["a", 1e-18],
  ["z", 1e-21],
  ["y", 1e-24],
  ["r", 1e-27],
  ["q", 1e-30],
]);
