import CustomElement from "./CustomElement";
import Widget from "./Widgets/Widget";
import handleInspectorChange from "../util/handleInspectorChange";
import { WidgetProperty, WidgetPropertyChoice, WidgetPropertyType } from "../types";

export default class WidgetInspector extends CustomElement {
    // Widget index required in order to update the widget directly, for when saving the project
    constructor(private widget: Widget) {
        super();
        this.element.className = "widget-inspector";

        for (const propertyKey in widget.propertyTypes) {
            const property = widget.properties[propertyKey];
            const propertyType = widget.propertyTypes[propertyKey];
            const inspectorProperty = <HTMLInputElement>this.addInspectorProperty(property, propertyType);

            this.widget.element.addEventListener("property-enabled", (e: CustomEvent) => {
                if (e.detail.propertyKey === propertyKey) {
                    inspectorProperty.style.display = "block";
                }
            });

            this.widget.element.addEventListener("property-disabled", (e: CustomEvent) => {
                if (e.detail.propertyKey === propertyKey) {
                    inspectorProperty.style.display = "none";
                }
            })
        }
    }

    private addInspectorProperty(property: WidgetProperty<any>, type: WidgetPropertyType): HTMLElement {
        switch (type) {
            case WidgetPropertyType.TEXT_SHORT:
                return this.addTextShort(property);
            case WidgetPropertyType.CHOICE:
                return this.addChoice(property);
            case WidgetPropertyType.SLIDER:
                return this.addSlider(property);
            case WidgetPropertyType.BOOLEAN:
                return this.addBoolean(property);
            default: break;
        }
    }

    private addTextShort(property: WidgetProperty<string>): HTMLElement {
        const inputElement = document.createElement("textarea");
        inputElement.className = "widget-inspector-input";
        this.element.appendChild(inputElement);

        
        if (property.value)
            inputElement.value = property.value;
        
        inputElement.addEventListener("input", () => {
            handleInspectorChange(property, inputElement.value);
        });

        this.widget.element.addEventListener("input", () => {
            handleInspectorChange(property, (this.widget.element as any).value);
            inputElement.value = (this.widget as any).element.value;
        })

        return inputElement;
    }

    private addChoice(property: WidgetProperty<WidgetPropertyChoice>): HTMLElement {
        const choiceElement = document.createElement("select");
        choiceElement.className = "widget-inspector-input";

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

        return choiceElement;
    }

    private addSlider(property: WidgetProperty<number>): HTMLElement {
        const sliderElement = document.createElement("input");
        sliderElement.className = "widget-inspector-input";
        sliderElement.type = "range";
        sliderElement.min = "1";
        sliderElement.max = "100";

        sliderElement.value = String(property.value);

        this.element.appendChild(sliderElement);

        sliderElement.addEventListener("input", () => {
            handleInspectorChange(property, sliderElement.value);
        })

        return sliderElement;
    }

    private addBoolean(property: WidgetProperty<boolean>): HTMLElement {
        const booleanElement = document.createElement("input");
        booleanElement.type = "checkbox";
        booleanElement.checked = property.value;
        
        this.element.appendChild(booleanElement);
        booleanElement.addEventListener("input", () => {
            handleInspectorChange(property, booleanElement.checked);
        })

        return booleanElement;
    }
}