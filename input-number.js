import { NumberValidator } from "./NumberValidator.js";
import { InputWithValidator } from "./InputWithValidator.js";

class InputNumber extends InputWithValidator {
  constructor() {
    super(new NumberValidator());
    this.inp.inputmode = "numeric";
    //this.inp.setAttribute("inputmode", "numeric");
  }
}

customElements.define("input-number", InputNumber);

export { InputNumber };
