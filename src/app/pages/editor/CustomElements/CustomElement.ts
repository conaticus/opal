export default class CustomElement {
    public element: HTMLElement;

    constructor(type: string = "div") {
        this.element = document.createElement(type);
    }
}