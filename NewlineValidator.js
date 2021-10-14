import { Validator } from "./Validator.js";

class NewlineValidator extends Validator {
  constructor(validator) {
    super();
    this.validator = validator;
  }
  isValid(c) {
    return c == "\n" || this.validator.isValid(c);
  }
  normalize(c) {
    if (c == "\n") {
      return c;
    }
    return this.validator.normalize(c);
  }
}

export { NewlineValidator };
