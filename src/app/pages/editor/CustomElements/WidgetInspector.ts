import CustomElement from "./CustomElement";
import Widget from "./Widgets/Widget";
import handleInspectorChange from "../util/handleInspectorChange";
import { WidgetProperty, WidgetPropertyChoice, WidgetPropertyType } from "../types";

const MIN_TEXT_SIZE = "1";
const MAX_TEXT_SIZE = "100";

export default class WidgetInspector extends CustomElement {
    // Widget index required in order to update the widget directly, for when saving the project
    constructor(private widget: Widget) {
        super();
        this.element.className = "widget-inspector";

        for (const propertyKey in widget.propertyTypes) {
            const property = widget.properties[propertyKey];
            const propertyType = widget.propertyTypes[propertyKey];
            const inspectorProperty = this.addInspectorProperty(property, propertyType);
            inspectorProperty.className = "widget-inspector-input";

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
        const sliderParent = document.createElement("div");
        sliderParent.style.display = "flex";

        const sliderElement = document.createElement("input");
        sliderElement.type = "range";
        sliderElement.min = MIN_TEXT_SIZE;
        sliderElement.max = MAX_TEXT_SIZE;

        const sliderInputElement = document.createElement("input");
        sliderInputElement.type = "number";
        sliderInputElement.min = MIN_TEXT_SIZE;
        sliderElement.max = MAX_TEXT_SIZE;

        sliderParent.appendChild(sliderElement);
        sliderParent.appendChild(sliderInputElement);

        sliderElement.value = String(property.value);
        sliderInputElement.value = String(property.value);

        this.element.appendChild(sliderParent);

        sliderElement.addEventListener("input", () => {
            sliderInputElement.value = sliderElement.value;
            handleInspectorChange(property, sliderElement.value);
        })

        sliderInputElement.addEventListener("input", () => {
            if (Number(sliderInputElement.value) < Number(MIN_TEXT_SIZE) && sliderInputElement.value !== "") {
                sliderInputElement.value = MIN_TEXT_SIZE;
                return;
            } else if (Number(sliderInputElement.value) > Number(MAX_TEXT_SIZE)) {
                sliderInputElement.value = MAX_TEXT_SIZE;
                return;
            }

            sliderElement.value = sliderInputElement.value;
            let sliderElementValue = sliderInputElement.value;
            if (sliderElementValue === "") sliderElementValue = "1"; 
            handleInspectorChange(property, sliderElementValue);
        })

        return sliderParent;
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