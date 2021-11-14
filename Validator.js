class Validator {
  isValid(c) {
    return true;
  }
  normalize(c) {
    return c;
  }
  validate(s) {
    if (s == null || s == "") {
      return s;
    }
    if (typeof s != "string") {
      s = s.toString();
    }
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

export { Validator };
