import { annotateElement } from "./annotateElement.js";
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
    this.inp = inp;

    const checkMaxLength = (s) => {
      const maxlen = this.getAttribute("maxlength");
      if (maxlen && s.length > maxlen) {
        this.onerror(`長さは${maxlen}文字までです`);
        return s.substring(0, maxlen);
      }
      return s;
    };
    inp.onkeydown = (e) => {
      if (e.metaKey) {
        return true;
      }
      //console.log(e.key, e.metaKey);
      const allows = ["Control", "Shift", "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Enter", "Meta", "Backspace", "Delete", "Escape", "Tab"];
      if (allows.includes(e.key)) {
        return true;
      }
      const c = e.key;
      //console.log(c, "valid", this.validator.isValid(c))
      const flg = this.validator.isValid(c);
      if (!flg) {
        this.onerror("入力できない文字です");
        return false;
      }
      const s2 = inp.value + c;
      return s2 == checkMaxLength(s2);
    };
    inp.onpaste = (e) => {
      const data = e.clipboardData.getData("Text");
      const s = this.validator.validate(data);
      const s2 = checkMaxLength(this.inp.value + s);
      // todo: 数値のみ抜き出す、変えられる？
      return s == data;
    };
    inp.onkeyup = () => {
      const s = inp.value;
      const s2 = this.validator.validate(s);
      const s3 = checkMaxLength(s2);
      inp.value = s3;
    };
  }
  onerror(s) {
    annotateElement(this.inp, s);
  }
  get value() {
    return this.inp.value;
  }
  set value(v) {
    const s2 = this.validator.validate(v);
    const maxlen = this.getAttribute("maxlength");
    const s3 = maxlen && s2.length >= maxlen ? s2.substring(0, maxlen) : s2;
    this.inp.value = s3;
  }
}

export { InputWithValidator };
