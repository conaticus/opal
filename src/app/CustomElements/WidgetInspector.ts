import CustomElement from "./CustomElement";
import Widget from "./Widgets/Widget";
import { WidgetPropertyType } from "../types";
import TextWidget from "./Widgets/TextWidget";

export default class WidgetInspector extends CustomElement {
    constructor(private widget: Widget) {
        super();

        for (const propertyName in widget.propertyTypes) {
            const widgetPropertyType = widget.propertyTypes[propertyName];

            switch (widgetPropertyType) {
                case WidgetPropertyType.TEXT_SHORT:
                    this.addTextShort(propertyName);
                    break;
            }
        }
    }

    private addTextShort(propertyName: string): void {
        const inputElement = document.createElement("input") as HTMLInputElement;
        this.element.appendChild(inputElement);

        const property = this.widget.properties[propertyName];
        if (property)
            inputElement.value = property;
        
        inputElement.addEventListener("input", () => {
            (this.widget as TextWidget).setText(inputElement.value);
        });

        (this.widget as TextWidget).element.addEventListener("input", () => {
            inputElement.value = (this.widget as TextWidget).element.value;
        })
    }
}