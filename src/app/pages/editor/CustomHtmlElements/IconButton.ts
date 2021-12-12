import CustomElement from "./CustomElement";

export default class IconButton extends CustomElement {
    htmlElement: HTMLImageElement;

    constructor(svgPath: string) {
        super("img");
        this.htmlElement.className = "icon-button";
        this.htmlElement.src = svgPath;
    }
}