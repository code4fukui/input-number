import { Validator } from "./Validator.js";

class NumberValidator extends Validator {
  isValid(c) {
    if (c == "") {
      return false;
    }
    return "0123456789０１２３４５６７８９".indexOf(c) >= 0;
  }
  normalize(c) {
    if (c == "") {
      return c;
    }
    const n = "0123456789０１２３４５６７８９".indexOf(c);
    if (n < 0) {
      return "";
    }
    if (n >= 10) {
      return (n - 10).toString();
    }
    return n.toString();
  }
}

export { NumberValidator };
