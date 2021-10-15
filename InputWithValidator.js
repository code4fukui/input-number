import { annotateElement } from "./annotateElement.js";
//import { create } from "https://js.sabae.cc/stdcomp.js";
import { NewlineValidator } from "./NewlineValidator.js";

const create = (tag, parent) => {
  const c = document.createElement(tag, parent);
  parent.appendChild(c);
  return c;
}

class InputWithValidator extends HTMLElement {
  constructor(validator, opts) {
    super();
    if (opts) {
      for (const name in opts) {
        if (opts[name] != null) {
          this.setAttribute(name, opts[name]);
        }
      }
    }
    const rows = this.getAttribute("rows");
    const inp = create(rows > 1 ? "textarea" : "input", this);
    inp.rows = rows;
    this.validator = rows > 1 ? new NewlineValidator(validator) : validator;
    inp.style.resize = "none";
    this.inp = inp;
    this.inp.style.boxSizing = "border-box";
    this.inp.style.width = "100%";
    //this.inp.style.height = "100%";

    const checkMaxLength = (s) => {
      const maxlen = this.getAttribute("maxlength");
      if (maxlen && s.length > maxlen) {
        this.onerror(`長さは${maxlen}文字までです`);
        return s.substring(0, maxlen);
      }
      return s;
    };
    inp.addEventListener("compositionstart", () => {
      this.composition = true;
    });
    inp.addEventListener("compositionend", () => {
      this.composition = false;
    });
    const checkRequired = () => {
      if (this.getAttribute("required") == "required") {
        if (this.inp.value.length > 0) {
          this.inp.classList.remove("required");
        } else {
          this.inp.classList.add("required");
        }
      }
    };
    inp.onkeydown = (e) => {
      if (this.composition) {
        return false;
      }
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
      if (this.composition) {
        return;
      }
      const s = inp.value;
      const s2 = this.validator.validate(s);
      const s3 = checkMaxLength(s2);
      inp.value = s3;
      checkRequired();
    };
    inp.onchange = () => {
      checkRequired();
    };
    const v = this.getAttribute("value");
    if (v) {
      this.value = v;
    }
    inp.onchange();
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
