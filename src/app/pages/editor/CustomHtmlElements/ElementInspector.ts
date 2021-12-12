import CustomElement from "./CustomElement";
import Element from "./OpalElements/Element";
import handleInspectorChange from "../util/handleInspectorChange";
import camelToCapitalised from "../util/camelToCapitalised";
import { ElementProperty, ElementPropertyChoice, ElementPropertyType } from "../types";

const MIN_TEXT_SIZE = "1";
const MAX_TEXT_SIZE = "100";

export default class ElementInspector extends CustomElement {
    constructor(private element: Element) {
        super();
        this.htmlElement.className = "element-inspector";

        for (const propertyKey in element.propertyTypes) {
            const property = element.properties[propertyKey];
            const propertyType = element.propertyTypes[propertyKey];

            const propertyLabel = document.createElement("h4");
            propertyLabel.innerText = camelToCapitalised(propertyKey);
            this.htmlElement.appendChild(propertyLabel);

            const inspectorProperty = this.addInspectorProperty(property, propertyType);
            inspectorProperty.className = "element-inspector-child";

            this.element.htmlElement.addEventListener("property-enabled", (e: CustomEvent) => {
                if (e.detail.propertyKey === propertyKey) {
                    propertyLabel.style.display = "block";
                    inspectorProperty.style.display = "block";
                }
            });

            this.element.htmlElement.addEventListener("property-disabled", (e: CustomEvent) => {
                if (e.detail.propertyKey === propertyKey) {
                    propertyLabel.style.display = "none";
                    inspectorProperty.style.display = "none";
                }
            })
        }
    }

    private addInspectorProperty(property: ElementProperty<any>, type: ElementPropertyType): HTMLElement {
        switch (type) {
            case ElementPropertyType.TEXT_SHORT:
                return this.addTextShort(property);
            case ElementPropertyType.CHOICE:
                return this.addChoice(property);
            case ElementPropertyType.SLIDER:
                return this.addSlider(property);
            case ElementPropertyType.BOOLEAN:
                return this.addBoolean(property);
            default: break;
        }
    }

    private addTextShort(property: ElementProperty<string>): HTMLElement {
        const inputElement = document.createElement("textarea");
        this.htmlElement.appendChild(inputElement);

        
        if (property.value)
            inputElement.value = property.value;
        
        inputElement.addEventListener("input", () => {
            handleInspectorChange(property, inputElement.value);
        });

        this.element.htmlElement.addEventListener("input", () => {
            handleInspectorChange(property, (this.element.htmlElement as any).value);
            inputElement.value = (this.element as any).htmlElement.value;
        })

        return inputElement;
    }

    private addChoice(property: ElementProperty<ElementPropertyChoice>): HTMLElement {
        const choiceElement = document.createElement("select");

        for (const choiceKey in property.value.choiceEnum) {
           const choiceString: string = property.value.choiceEnum[choiceKey];
           const optionElement = document.createElement("option");

           optionElement.innerText = choiceString;
           choiceElement.appendChild(optionElement);
        }

        choiceElement.value = property.value.currentChoice;

        this.htmlElement.appendChild(choiceElement);
        
        choiceElement.addEventListener("input", () => {
            handleInspectorChange(property, choiceElement.value);
        })

        return choiceElement;
    }

    private addSlider(property: ElementProperty<number>): HTMLElement {
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

        this.htmlElement.appendChild(sliderParent);

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

    private addBoolean(property: ElementProperty<boolean>): HTMLElement {
        const booleanElement = document.createElement("input");
        booleanElement.type = "checkbox";
        booleanElement.checked = property.value;
        
        this.htmlElement.appendChild(booleanElement);
        booleanElement.addEventListener("input", () => {
            handleInspectorChange(property, booleanElement.checked);
        })

        return booleanElement;
    }
}