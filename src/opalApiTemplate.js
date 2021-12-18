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

    setBackgroundColor(color) {
        this.htmlElement.style.backgroundColor = color;
    }

    setBorderColor(color) {
        this.htmlElement.style.borderColor = color;
    }

    setBorderWidth(width) {
        this.htmlElement.style.borderWidth = width + "px";
    }

    setBorderRadius(radius) {
        this.htmlElement.style.borderRadius = radius + "px";
    }

    setCursor(type) {
        this.htmlElement.style.cursor = type;
    }

    onclick() {}
}

export class TextBoxElement extends Element {
    setText(value) {
        this.htmlElement.innerText = value;
    }

    setWeight(value) {
        this.htmlElement.style.fontWeight = value + "px";
    }

    setColor(color) {
        this.htmlElement.style.color = color;
    }
}