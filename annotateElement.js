let opendelaytimer = null;

const annotateElement = (element, html, timeout = 1000, opendelay = 50) => {
  if (opendelaytimer) {
    clearTimeout(opendelaytimer);
  }
  opendelaytimer = setTimeout(() => {
    const b = element.getBoundingClientRect();
    const ann = new AnnotateElement(element);
    ann.innerHTML = html;
    document.body.appendChild(ann);
    ann.style.position = "absolute";
    ann.style.zIndex = 10000;
    const setPos = () => {
      //ann.style.top = (b.top + window.pageYOffset) + "px";
      ann.style.top = (b.bottom + window.pageYOffset) + "px";
      ann.style.left = (b.left + window.pageXOffset) + "px";
    };
    setPos();
    addEventListener("resize", setPos);
    setTimeout(() => {
      removeEventListener("resize", setPos);
      document.body.removeChild(ann);
    }, timeout);
  }, opendelay);
};

class AnnotateElement extends HTMLElement {
  constructor(element) {
    super();
  }
}

customElements.define("annotate-element", AnnotateElement);

export { annotateElement };
