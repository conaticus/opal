import { ElementPropertyCategory, ElementPropertyType, ElementPropertyTypes, FontWeight, TextElementProperties, TextType } from "../../types";
import Element from "./Element";

const DEFAULT_TEXT_SIZE = 18;

export default class TextBoxElement extends Element {
    properties: TextElementProperties;
    htmlElement: HTMLDivElement;

    constructor() {
        const generalCategory: ElementPropertyCategory = { label: "General", priority: 2 };
        const typographyCategory: ElementPropertyCategory = { label: "Typography", priority: 3 };
        const seoCategory: ElementPropertyCategory = { label: "SEO", priority: 4 };

        const propertyTypes: ElementPropertyTypes = {
            text: {
                type: ElementPropertyType.TEXT_EDITABLE,
                category: generalCategory
            },
            size: {
                type: ElementPropertyType.SLIDER,
                category: typographyCategory
            },
            weight: {
                type: ElementPropertyType.CHOICE,
                category: typographyCategory,
                choiceEnum: FontWeight
            },
            type: {
                type: ElementPropertyType.CHOICE,
                category: seoCategory,
                choiceEnum: TextType
            }
        }

        super("div", propertyTypes);

        this.htmlElement.className = "text-box-element";
        this.htmlElement.contentEditable = "true";

        this.setText("Textbox");
        this.setType(TextType.PARAGRAPH);
        this.setSize(DEFAULT_TEXT_SIZE);
        this.setWeight(FontWeight.FOUR_HUNDRED);

        this.properties.text.handleInspectorChange = (value: string) => this.setText(value);
        this.properties.size.handleInspectorChange = (value: number) => this.setSize(value);
        this.properties.weight.handleInspectorChange = (value: FontWeight) => this.setWeight(value);
        this.properties.type.handleInspectorChange = (value: TextType) => this.setType(value);
    }

    public setText(value: string): void {
        this.properties.text.value = value;
        this.htmlElement.innerText = value;
    }

    public setSize(value: number): void {
        this.htmlElement.style.fontSize = value + "px";
        this.properties.size.value = value;
    }

    public setType(value: TextType): void {
        this.properties.type.value.currentChoice = value;
    }

    public setWeight(value: FontWeight): void {
        this.properties.weight.value.currentChoice = value;
        this.htmlElement.style.fontWeight = String(value);
    }

    public loadProperties(): void {
        this.setText(this.properties.text.value);
        this.setSize(this.properties.size.value);
        this.setWeight(this.properties.weight.value.currentChoice as FontWeight);
        this.setType(this.properties.type.value.currentChoice as TextType);
    }
}