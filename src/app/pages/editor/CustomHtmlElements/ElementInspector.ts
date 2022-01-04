import CustomElement from "./CustomElement";
import OpalElement from "./OpalElements/OpalElement";
import handleInspectorChange from "../util/handleInspectorChange";
import camelToCapitalised from "../util/camelToCapitalised";
import { ElementProperty, ElementPropertyChoice, ElementPropertyType } from "../types";
import setContentEditableCursorEnd from "../util/setContentEditableCursorEnd";
import Dropdown from "./Dropdown";

interface CategoryProperty {
    propertyLabel: HTMLHeadingElement;
    inspectorProperty: HTMLElement;
}

interface Categories {
    [key: string]: {
        categoryProperties: CategoryProperty[];
        priority: number;
    }
}

const MIN_TEXT_SIZE = "1";
const MAX_TEXT_SIZE = "100";

export default class ElementInspector extends CustomElement {
    constructor(private opalElement: OpalElement) {
        super();
        this.htmlElement.className = "element-inspector";

        const categories: Categories = {};

        for (const propertyKey in opalElement.propertyTypes) {
            const property = opalElement.properties[propertyKey];
            const propertyType = opalElement.propertyTypes[propertyKey];

            const propertyLabel = document.createElement("h4");
            propertyLabel.innerText = camelToCapitalised(propertyKey);
            propertyLabel.style.color = "#C5C5C5";
            propertyLabel.style.fontSize = "15px";

            const inspectorProperty = this.createInspectorProperty(property, propertyType.type);
            inspectorProperty.className = "element-inspector-child";

            if (!categories[property.category.label]) {
                categories[property.category.label] = {
                    categoryProperties: [],
                    priority: property.category.priority,
                }
            }

            categories[property.category.label].categoryProperties.push({ propertyLabel, inspectorProperty });

            this.opalElement.htmlElement.addEventListener("property-enabled", (e: CustomEvent) => {
                if (e.detail.propertyKey === propertyKey) {
                    propertyLabel.style.display = "block";
                    inspectorProperty.style.display = "block";
                }
            });

            this.opalElement.htmlElement.addEventListener("property-disabled", (e: CustomEvent) => {
                if (e.detail.propertyKey === propertyKey) {
                    propertyLabel.style.display = "none";
                    inspectorProperty.style.display = "none";
                }
            })
        }

        const sortedCategories = Object.keys(categories).sort((a, b) => categories[a].priority - categories[b].priority);
        sortedCategories.forEach(categoryLabel => {
            const dropdownChild = document.createElement("div");
            dropdownChild.className = "inspector-property";

            categories[categoryLabel].categoryProperties.forEach(({ propertyLabel, inspectorProperty }) => {
                dropdownChild.appendChild(propertyLabel);
                dropdownChild.appendChild(inspectorProperty);
            })

            new Dropdown(categoryLabel, this.htmlElement, dropdownChild);
        })
    }

    private createInspectorProperty(property: ElementProperty<any>, type: ElementPropertyType): HTMLElement {
        switch (type) {
            case ElementPropertyType.TEXT_EDITABLE:
                return this.createTextEditable(property);
            case ElementPropertyType.TEXT_SHORT:
                return this.createTextShort(property);
            case ElementPropertyType.CHOICE:
                return this.createChoice(property);
            case ElementPropertyType.NUMBER:
                return this.createNumber(property);
            case ElementPropertyType.BOOLEAN:
                return this.createBoolean(property);
            default: break;
        }
    }

    private createTextEditable(property: ElementProperty<string>): HTMLElement {
        const inputElement = document.createElement("textarea");
        
        if (property.value)
            inputElement.value = property.value;
        
        inputElement.addEventListener("input", () => {
            handleInspectorChange(property, inputElement.value);
        });

        this.opalElement.htmlElement.addEventListener("input", (e) => {
            handleInspectorChange(property, this.opalElement.htmlElement.innerText);
            setContentEditableCursorEnd(this.opalElement.htmlElement);
            inputElement.value = this.opalElement.htmlElement.innerText;
        })

        return inputElement;
    }

    private createTextShort(property: ElementProperty<string>): HTMLElement {
        const inputElement = document.createElement("input");
        inputElement.type = "text";

        if (property.value)
            inputElement.value = property.value;
        
        inputElement.addEventListener("input", () => {
            handleInspectorChange(property, inputElement.value);
        })

        return inputElement;
    }

    private createChoice(property: ElementProperty<ElementPropertyChoice>): HTMLElement {
        const choiceElement = document.createElement("select");

        for (const choiceKey in property.value.choiceEnum) {
           const choiceString: string = property.value.choiceEnum[choiceKey];
           const optionElement = document.createElement("option");

           optionElement.innerText = choiceString;
           choiceElement.appendChild(optionElement);
        }

        choiceElement.value = property.value.currentChoice;
        
        choiceElement.addEventListener("input", () => {
            handleInspectorChange(property, choiceElement.value);
        })

        return choiceElement;
    }

    private createNumber(property: ElementProperty<number>): HTMLElement {
        const inputElement = document.createElement("input");
        inputElement.type = "number";
        inputElement.min = MIN_TEXT_SIZE;
        inputElement.max = MAX_TEXT_SIZE;

        inputElement.value = String(property.value);

        inputElement.addEventListener("input", () => {
            if (Number(inputElement.value) > Number(MAX_TEXT_SIZE)) inputElement.value = MAX_TEXT_SIZE;
            else if (Number(inputElement.value) < Number(MIN_TEXT_SIZE) && inputElement.value !== "") inputElement.value = MIN_TEXT_SIZE;

            handleInspectorChange(property, Number(inputElement.value));
        })

        return inputElement;
    }

    private createBoolean(property: ElementProperty<boolean>): HTMLElement {
        const booleanElement = document.createElement("input");
        booleanElement.type = "checkbox";
        booleanElement.checked = property.value;
        
        booleanElement.addEventListener("input", () => {
            handleInspectorChange(property, booleanElement.checked);
        })

        return booleanElement;
    }
}