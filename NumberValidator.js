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
      return null;
    }
    const n = "0123456789０１２３４５６７８９".indexOf(c);
    if (n < 0) {
      return null;
    }
    if (n >= 10) {
      return (n - 10).toString();
    }
    return n.toString();
  }
  validate(s) {
    const res = [];
    for (const c of s) {
      const r = this.normalize(c);
      if (r !== null) {
        res.push(r);
      }
    }
    return res.join("");
  }
}

export { NumberValidator };