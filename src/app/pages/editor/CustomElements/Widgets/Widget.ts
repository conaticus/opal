import { SaveWidget, WidgetProperties, WidgetProperty, WidgetPropertyTypes } from "../../types";
import CustomElement from "../CustomElement";
import TextWidget from "./TextWidget";

export default abstract class Widget extends CustomElement {
    public properties: WidgetProperties;

    constructor(type: string = "div", public propertyTypes: WidgetPropertyTypes) {
        super(type);
        this.properties = {};
    }

    static generateFromSave(saveWidget: SaveWidget): Widget {
        let widget: Widget;
        switch (saveWidget.type) {
            case "TextWidget":
                widget = new TextWidget();
        }

        for (const propertyKey in saveWidget.properties) {
            const property = saveWidget.properties[propertyKey];
            widget.properties[propertyKey].value = property;
        }

        widget.propertyTypes = saveWidget.propertyTypes;

        return widget;
    }

    public disableProperty(propertyKey: string): void {
        this.properties[propertyKey].disabled = true;
        const disableEvent = new CustomEvent("property-disabled", { detail: { propertyKey } })
        this.element.dispatchEvent(disableEvent);
    }

    public enableProperty(propertyKey: string): void {
        this.properties[propertyKey].disabled = false;
        const disableEvent = new CustomEvent("property-enabled", { detail: { propertyKey } })
        this.element.dispatchEvent(disableEvent);
    }

    public abstract loadProperties(): void;
}