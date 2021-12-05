import CustomElement from "./CustomElement";

export default class Resizer extends CustomElement {
    constructor() {
        super();
        this.element.className = "resizer";
    }
}