import CustomElement from "./CustomElement";
import TextElement from "./OpalElements/Text/TextboxElement";
import Element from "./OpalElements/Element";
import appendCustomHtmlElement from "../util/appendCustomHtmlElement";
import { state } from "../util/state";

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
            if (this.occupied) return;
            this.htmlElement.style.border = "solid 1px #0084ff";
        })

        this.htmlElement.addEventListener("dragleave", () => {
            if (this.occupied) return;
            this.htmlElement.style.border = "none";
        })


        this.htmlElement.addEventListener("drop", async (e) => {
            if (this.occupied) return;
            e.preventDefault();
            const elementType = e.dataTransfer.getData("element-type");
            await this.createElement(elementType);
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

    private async createElement(elementType: string): Promise<void> {
        let element: Element;

        switch (elementType) {
            case String(TextElement):
                element = new TextElement();
                break;
            default:
                return;
        }

        await this.addElement(element);
    }

    public async addElement(element: Element): Promise<void> {
        state.elements.push(element);
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