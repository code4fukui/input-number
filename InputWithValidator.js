//import { create } from "https://js.sabae.cc/stdcomp.js";

const create = (tag, parent) => {
  const c = document.createElement(tag, parent);
  parent.appendChild(c);
  return c;
}

class InputWithValidator extends HTMLElement {
  constructor(validator) {
    super();
    this.validator = validator;
    const inp = create("input", this);
    inp.onkeydown = (e) => {
      if (e.metaKey) {
        return true;
      }
      //console.log(e.key, e.metaKey);
      const allows = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Enter", "Meta", "Backspace", "Delete", "Escape", "Tab"];
      if (allows.includes(e.key)) {
        return true;
      }
      const maxlen = this.getAttribute("maxlength");
      if (maxlen && inp.value.length >= maxlen) {
        return false;
      }
      const c = e.key;
      //console.log(c, "valid", this.validator.isValid(c))
      return this.validator.isValid(c);
    };
    inp.onpaste = (e) => {
      const maxlen = this.getAttribute("maxlength");
      if (maxlen && inp.value.length >= maxlen) {
        return false;
      }
      const data = e.clipboardData.getData("Text");
      const s = this.validator.validate(data);
      // todo: 数値のみ抜き出す、変えられる？
      return s == data;
    };
    inp.onkeyup = () => {
      const s = inp.value;
      const s2 = this.validator.validate(s);
      const maxlen = this.getAttribute("maxlength");
      const s3 = maxlen && s2.length >= maxlen ? s2.substring(0, maxlen) : s2;
      if (s != s3) {
        inp.value = s3;
      }
    };
  }
}

export { InputWithValidator };
