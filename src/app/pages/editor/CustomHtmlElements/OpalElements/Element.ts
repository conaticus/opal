import { ElementProperties, ElementPropertyTypes, ElementSave } from "../../types";
import CustomElement from "../CustomElement";
import TextElement from "./TextElement";

export default abstract class Element extends CustomElement {
    public properties: ElementProperties;

    constructor(type: string = "div", public propertyTypes: ElementPropertyTypes) {
        super(type);
        this.properties = {};
    }

    static generateFromSave(elementSave: ElementSave): Element {
        let element: Element;
        switch (elementSave.type) {
            case "TextBoxElement":
                element = new TextElement();
                break;
            default:
                throw new Error(`Could not find element with given type '${elementSave.type}'.`);
        }

        for (const propertyKey in elementSave.properties) {
            const property = elementSave.properties[propertyKey];
            element.properties[propertyKey].value = property;
        }

        element.propertyTypes = elementSave.propertyTypes;

        return element;
    }

    public disableProperty(propertyKey: string): void {
        this.properties[propertyKey].disabled = true;
        const disableEvent = new CustomEvent("property-disabled", { detail: { propertyKey } })
        this.htmlElement.dispatchEvent(disableEvent);
    }

    public enableProperty(propertyKey: string): void {
        this.properties[propertyKey].disabled = false;
        const disableEvent = new CustomEvent("property-enabled", { detail: { propertyKey } })
        this.htmlElement.dispatchEvent(disableEvent);
    }

    public abstract loadProperties(): void;
    protected abstract initialiseProperties(): void;
}