import { commonUnits, unitPrefixes } from "./CommonUnits";
import { FQuantity } from "./FQuantity";
import { math } from "./math";

export function parseUnit(s: string): FQuantity {
  // Example: 'kg/ m ^ -2', 'm s *kg'
  let tokens: string[] = [];
  // Split the string into tokens, e.g. ['kg', '/', 'm', '^', '-2']
  let current = "";
  for (let i = 0; i < s.length; i++) {
    // if s[i] is a letter, digit, dot or minus sign, add it to the current token
    if (s[i].match(/[a-zA-Z0-9\.\-]/)) {
      current += s[i];
    } else {
      // if s[i] is not a letter, add the current token to the tokens array
      if (current !== "") {
        tokens.push(current);
        current = "";
      }
      if (s[i] !== " ") {
        tokens.push(s[i]);
      }
    }
  }
  if (current !== "") {
    tokens.push(current);
  }

  function parseSingleUnit(s: string): FQuantity {
    if (commonUnits.has(s)) {
      return commonUnits.get(s) as FQuantity;
    } else {
      const prefix = unitPrefixes.get(s[0]);
      const body = commonUnits.get(s.slice(1));
      if (prefix !== undefined && body !== undefined) {
        return body.mul(new FQuantity(prefix));
      } else {
        throw new Error(`Unknown unit: ${s}`);
      }
    }
  }

  let tokens2: (string | FQuantity)[] = [];
  // Replace the tokens with FQuantity objects and parse the exponent
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "^") {
      tokens2[tokens2.length - 1] = FQuantity.eval(
        math.parse("a^(" + tokens[i + 1] + ")"),
        new Map([["a", tokens2[tokens2.length - 1] as FQuantity]])
      );
      i++;
    } else if (tokens[i] === "/" || tokens[i] == "*") {
      tokens2.push(tokens[i])
    } else {
      tokens2.push(parseSingleUnit(tokens[i]));
    }
  }

  // Combine the tokens
  let res = new FQuantity(1);
  for (let i = 0; i < tokens2.length; i++) {
    if (tokens2[i] === "/") {
      res = res.div(tokens2[i + 1] as FQuantity);
      i++;
    } else if (tokens2[i] === "*") {
      res = res.mul(tokens2[i + 1] as FQuantity);
      i++;
    } else {
      res = res.mul(tokens2[i] as FQuantity);
    }
  }
  return res;
}
