import CustomElement from "./CustomElement";
import Widget from "./Widgets/Widget";
import TextWidget from "./Widgets/TextWidget";
import handleInspectorChange from "../util/handleInspectorChange";
import { WidgetProperty, WidgetPropertyChoice, WidgetPropertyType } from "../types";
import { widgets } from "../globals";

export default class WidgetInspector extends CustomElement {
    // Widget index required in order to update the widget directly, for when saving the project
    constructor(private widgetIndex: number) {
        super();
        this.element.className = "widget-inspector";

        const widget: Widget = widgets[widgetIndex];
        for (const propertyName in widget.propertyTypes) {
            const widgetPropertyType = widget.propertyTypes[propertyName];

            switch (widgetPropertyType) {
                case WidgetPropertyType.TEXT_SHORT:
                    this.addTextShort(propertyName);
                    break;
                case WidgetPropertyType.CHOICE:
                    this.addChoice(propertyName);
                    break;
                case WidgetPropertyType.SLIDER:
                    this.addSlider(propertyName);
                    break;
                default: break;
            }
        }
    }

    private addTextShort(propertyName: string): void {
        const inputElement = document.createElement("textarea");
        inputElement.className = "widget-inspector-input";
        this.element.appendChild(inputElement);

        
        const property = widgets[this.widgetIndex].properties[propertyName];
        if (property.value)
            inputElement.value = property.value;
        
        inputElement.addEventListener("input", () => {
            handleInspectorChange(widgets[this.widgetIndex].properties[propertyName], inputElement.value);
        });

        widgets[this.widgetIndex].element.addEventListener("input", () => {
            inputElement.value = (widgets[this.widgetIndex] as any).element.value;
        })
    }

    private addChoice(propertyName: string): void {
        const choiceElement = document.createElement("select");
        choiceElement.className = "widget-inspector-input";

        const property = widgets[this.widgetIndex].properties[propertyName] as WidgetProperty<WidgetPropertyChoice>;

        for (const choiceKey in property.value.choiceEnum) {
           const choiceString: string = property.value.choiceEnum[choiceKey];
           const optionElement = document.createElement("option");

           optionElement.innerText = choiceString;
           choiceElement.appendChild(optionElement);
        }

        choiceElement.value = property.value.currentChoice;

        this.element.appendChild(choiceElement);
        
        choiceElement.addEventListener("input", () => {
            handleInspectorChange(widgets[this.widgetIndex].properties[propertyName], choiceElement.value);
        })
    }

    private addSlider(propertyName: string): void {
        const sliderElement = document.createElement("input");
        sliderElement.className = "widget-inspector-input";
        sliderElement.type = "range";
        sliderElement.min = "1";
        sliderElement.max = "100";

        const property = widgets[this.widgetIndex].properties[propertyName];
        sliderElement.value = property.value;

        this.element.appendChild(sliderElement);

        sliderElement.addEventListener("input", () => {
            handleInspectorChange(widgets[this.widgetIndex].properties[propertyName], sliderElement.value);
        })
    }
}