export const CursorTypes = {
    POINTER: "pointer",
}

export class Element {
    constructor(id) {
        this.htmlElement = document.getElementById(id);
        this.htmlElement.onclick = () => this.onclick();
    }

    remove() {
        this.htmlElement.remove();
    }

    show() {
        this.htmlElement.style.display = "block";
    }

    hide() {
        this.htmlElement.style.display = "none";
    }

    set backgroundColor(color) {
        this.htmlElement.style.backgroundColor = color;
    }

    set borderColor(color) {
        this.htmlElement.style.borderColor = color;
    }

    set borderWidth(width) {
        this.htmlElement.style.borderWidth = width + "px";
    }

    set borderRadius(radius) {
        this.htmlElement.style.borderRadius = radius + "px";
    }

    set cursor(type) {
        this.htmlElement.style.cursor = type;
    }

    onclick() {}
}

export class TextBoxElement extends Element {
    set text(value) {
        this.htmlElement.innerText = value;
    }

    set weight(value) {
        this.htmlElement.style.fontWeight = value + "px";
    }

    set color(color) {
        this.htmlElement.style.color = color;
    }
}