import CustomElement from "./CustomElement";

export default class Grid extends CustomElement {
    constructor() {
        super();
        this.htmlElement.className = "grid-container";
    }

    public addItem(element: HTMLElement): void {
        element.className = "grid-item";
        this.htmlElement.appendChild(element);
    }
}