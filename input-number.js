import { NumberValidator } from "./NumberValidator.js";
import { InputWithValidator } from "./InputWithValidator.js";

class InputNumber extends InputWithValidator {
  constructor(opts) {
    super(new NumberValidator(), opts);
    this.inp.inputmode = "numeric";
    //this.inp.setAttribute("inputmode", "numeric");
  }
}

customElements.define("input-number", InputNumber);

export { InputNumber };
