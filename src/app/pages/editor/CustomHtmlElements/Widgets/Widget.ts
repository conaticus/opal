import {
    WidgetProperties,
    WidgetProperty,
    WidgetPropertyType,
    WidgetPropertyTypes,
    WidgetSave,
    WidgetType,
} from "../../types";
import CustomElement from "../CustomElement";
import TextboxWidget from "./Text/TextboxWidget";

export default abstract class Widget extends CustomElement {
    public properties: WidgetProperties;

    constructor(
        type: string = "div",
        public propertyTypes: WidgetPropertyTypes
    ) {
        super(type);
        this.properties = {};
        this.propertyTypes.identifier = {
            type: WidgetPropertyType.TEXT_SHORT,
            category: { label: "Widget Settings", priority: 0 },
        };

        this.initialiseProperties();

        this.properties.identifier.handleInspectorChange = (value: string) =>
            (this.properties.identifier.value = value);
    }

    static generateFromSave(widgetSave: WidgetSave): Widget {
        let widget: Widget;
        switch (widgetSave.type) {
            case WidgetType.TextBox:
                widget = new TextboxWidget();
                break;
            default:
                throw new Error(
                    `Could not find widget with given type '${widgetSave.type}'.`
                );
        }

        for (const propertyKey in widgetSave.properties) {
            const property = widgetSave.properties[propertyKey];
            widget.properties[propertyKey].value = property;
        }

        widget.propertyTypes = widgetSave.propertyTypes;

        return widget;
    }

    public disableProperty(propertyKey: string): void {
        this.properties[propertyKey].disabled = true;
        const disableEvent = new CustomEvent("property-disabled", {
            detail: { propertyKey },
        });
        this.htmlElement.dispatchEvent(disableEvent);
    }

    public enableProperty(propertyKey: string): void {
        this.properties[propertyKey].disabled = false;
        const disableEvent = new CustomEvent("property-enabled", {
            detail: { propertyKey },
        });
        this.htmlElement.dispatchEvent(disableEvent);
    }

    private initialiseProperties(): void {
        for (const propertyKey in this.propertyTypes) {
            const propertyType = this.propertyTypes[propertyKey];

            const property: WidgetProperty<any> = {
                disabled: false,
                category: propertyType.category,
            };

            if (propertyType.type === WidgetPropertyType.CHOICE) {
                if (!propertyType.choiceEnum)
                    throw new Error("Choice property has no choice enum.");

                property.value = { choiceEnum: propertyType.choiceEnum };
            }

            this.properties[propertyKey] = property;
        }
    }

    public abstract loadProperties(): void;
}
