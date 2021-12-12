import { elements } from "../globals";
import CustomElement from "./CustomElement";
import TextElement from "./OpalElements/TextElement";
import Element from "./OpalElements/Element";
import appendCustomHtmlElement from "../util/appendCustomHtmlElement";

export default class ElementContainer extends CustomElement {
    public occupied: boolean;

    constructor(htmlElement: HTMLDivElement = null) {
        super();
        if (htmlElement) this.htmlElement = htmlElement;
        this.occupied = false;
        
        this.htmlElement.className = "element-container";
        this.htmlElement.addEventListener("dragover", (e) => {
            if (this.occupied) return;
            e.preventDefault(); 
        });

        this.htmlElement.addEventListener("drop", (e) => {
            e.preventDefault();
            const elementType = e.dataTransfer.getData("element-type");
            this.createElement(elementType);
        })
    }

    private createElement(elementType: string): void {
        let element: Element;

        switch (elementType) {
            case String(TextElement):
                element = new TextElement();
                break;
            default:
                return;
        }

        this.addElement(element);
    }

    public addElement(element: Element): void {
        elements.push(element);
        appendCustomHtmlElement(this.htmlElement, element);
        this.dispatchElementCreate(element);
        this.occupied = true;
    }

    private dispatchElementCreate(element: Element) {
        const elementEvent = new CustomEvent("element-create", { detail: { element } });
        this.htmlElement.dispatchEvent(elementEvent);
    }
}