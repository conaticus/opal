import { elements } from "../globals";
import CustomElement from "./CustomElement";
import TextElement from "./OpalElements/TextBoxElement";
import Element from "./OpalElements/Element";
import appendCustomHtmlElement from "../util/appendCustomHtmlElement";

export default class ElementContainer extends CustomElement {
    public occupied: boolean;

    constructor(htmlElement: HTMLDivElement = null) {
        super();

        if (htmlElement) {
            this.htmlElement = htmlElement;
            this.elementAdded();
        } else {
            this.htmlElement.style.height = "50px";
        }

        this.occupied = false;
        
        this.htmlElement.addEventListener("dragover", (e) => {
            if (this.occupied) return;
            e.preventDefault();
        });

        this.htmlElement.addEventListener("dragenter", () => {
            this.htmlElement.style.border = "solid 1px #0084ff";
        })

        this.htmlElement.addEventListener("dragleave", () => {
            this.htmlElement.style.border = "none";
        })


        this.htmlElement.addEventListener("drop", (e) => {
            if (this.occupied) return;
            e.preventDefault();
            const elementType = e.dataTransfer.getData("element-type");
            this.createElement(elementType);
        }, { once: true });

    }

    private elementAdded(): void {
        this.htmlElement.style.height = "auto";

        this.htmlElement.addEventListener("mouseenter", () => {
            this.htmlElement.style.border = "solid 1px #0084ff";
        })

        this.htmlElement.addEventListener("mouseleave", () => {
            this.htmlElement.style.border = "none";
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
        this.elementAdded();
        this.occupied = true;
        this.dispatchElementAdd(element);
    }

    private dispatchElementAdd(element: Element) {
        const elementEvent = new CustomEvent("element-add", { detail: { element } });
        this.htmlElement.dispatchEvent(elementEvent);
    }
}