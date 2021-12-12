export default class CustomElement {
    public htmlElement: HTMLElement;

    constructor(type: string = "div") {
        this.htmlElement = document.createElement(type);
    }

    public addClass(className: string) {
        this.htmlElement.classList.add(className);
    }
}