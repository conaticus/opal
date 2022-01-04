import TextboxElement from "../Text/TextboxElement";
import OpalElement from "../OpalElement";
import appendCustomHtmlElement from "../../../util/appendCustomHtmlElement";
import { state } from "../../../util/state";
import { ContainerElementProperties, ElementPropertyCategory, ElementPropertyType, ElementPropertyTypes } from "../../../types";
import { createInspector } from "../../../scripts/inspector";

export const elementContainers = document.getElementById("element-containers");

export default class ContainerElement extends OpalElement {
    properties: ContainerElementProperties;
    constructedState: ContainerElement;
    public occupied: boolean;

    constructor() {
        const positionCategory: ElementPropertyCategory = {
            label: "Position",
            priority: 1,
        }

        const propertyTypes: ElementPropertyTypes = {
            padding: {
                type: ElementPropertyType.NUMBER,
                category: positionCategory,
            }
        }

        super("div", propertyTypes);

        this.properties.padding.handleInspectorChange = (value: number) => this.setPadding(value);

        this.htmlElement.style.height = "50px";

        this.occupied = false;
        
        this.htmlElement.addEventListener("dragover", (e) => {
            if (this.occupied) return;
            e.preventDefault();
        });

        this.htmlElement.addEventListener("dragenter", () => {
            if (this.occupied) return;
            this.htmlElement.style.outline = "solid 1px #0084ff";
        })

        this.htmlElement.addEventListener("dragleave", () => {
            if (this.occupied) return;
            this.htmlElement.style.outline = "none";
        })

        this.htmlElement.addEventListener("drop", async (e) => {
            if (this.occupied) return;
            e.preventDefault();
            const elementType = e.dataTransfer.getData("element-type");
            await this.createElement(elementType);
        }, { once: true });

        this.constructedState = this;
    }

    private setPadding(value: number): void {
        this.properties.padding.value = value;
        this.htmlElement.style.padding = value + "px";
    }

    private hover(element: OpalElement) {
        element.htmlElement.style.outline = "solid 1px #0084ff";
    }

    private unhover(element: OpalElement) {
        element.htmlElement.style.outline = "none";
    }

    private elementAdded(): void {
        this.htmlElement.style.height = "auto";

        this.htmlElement.addEventListener("mouseenter", () => {
            this.hover(this);
        })

        this.htmlElement.addEventListener("mouseleave", () => {
            this.unhover(this)
        })
    }

    private async createElement(elementType: string): Promise<void> {
        let element: OpalElement;

        switch (elementType) {
            case String(TextboxElement):
                element = new TextboxElement();
                break;
            default:
                return;
        }

        await this.addElement(element);
    }

    public async addElement(element: OpalElement): Promise<void> {
        createInspector(element, this);
        appendCustomHtmlElement(this.htmlElement, element);

        element.htmlElement.addEventListener("mouseenter", () => {
            this.unhover(this);
            this.hover(element);
        })

        element.htmlElement.addEventListener("mouseleave", () => {
            this.unhover(element);
            this.hover(this);
        })

        state.elements.push(element);
        this.occupied = true;

        this.elementAdded();
    }

    public loadProperties(): void {
        this.setPadding(this.properties.padding.value);
    }
}