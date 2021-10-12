import { NumberValidator } from "./NumberValidator.js";
import { InputWithValidator } from "./InputWithValidator.js";

class InputNumber extends InputWithValidator {
  constructor() {
    super(new NumberValidator());
  }
}

customElements.define("input-number", InputNumber);
