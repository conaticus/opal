import CustomElement from "./CustomElement";
import Widget from "./Widgets/Widget";
import { TextWidgetProperties, WidgetProperty, WidgetPropertyChoice, WidgetPropertyType } from "../types";
import TextWidget from "./Widgets/TextWidget";
import handleInspectorChange from "../util/handleInspectorChange";

export default class WidgetInspector extends CustomElement {
    constructor(private widget: Widget) {
        super();
        this.element.className = "widget-inspector";

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

        const property = this.widget.properties[propertyName];
        if (property.value)
            inputElement.value = property.value;
        
        inputElement.addEventListener("input", () => {
            handleInspectorChange(property, inputElement.value);
        });

        this.widget.element.addEventListener("input", () => {
            inputElement.value = (this.widget as TextWidget).element.value;
        })
    }

    private addChoice(propertyName: string): void {
        const choiceElement = document.createElement("select");
        choiceElement.className = "widget-inspector-input";

        const property = this.widget.properties[propertyName] as WidgetProperty<WidgetPropertyChoice>;

        for (const choiceKey in property.value.choiceEnum) {
           const choiceString: string = property.value.choiceEnum[choiceKey];
           const optionElement = document.createElement("option");

           optionElement.innerText = choiceString;
           choiceElement.appendChild(optionElement);
        }

        choiceElement.value = property.value.currentChoice;

        this.element.appendChild(choiceElement);
        
        choiceElement.addEventListener("input", () => {
            handleInspectorChange(property, choiceElement.value);
        })
    }

    private addSlider(propertyName: string): void {
        const sliderElement = document.createElement("input");
        sliderElement.className = "widget-inspector-input";
        sliderElement.type = "range";
        sliderElement.min = "1";
        sliderElement.max = "100";

        const property = this.widget.properties[propertyName];

        this.element.appendChild(sliderElement);

        sliderElement.addEventListener("input", () => {
            handleInspectorChange(property, sliderElement.value);
        })
    }
}