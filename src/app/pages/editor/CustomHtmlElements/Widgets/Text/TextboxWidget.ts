import {
    WidgetPropertyCategory,
    WidgetPropertyType,
    WidgetPropertyTypes,
    FontWeight,
    TextWidgetProperties,
    TextType,
} from "../../../types";
import Widget from "../Widget";

const DEFAULT_TEXT_SIZE = 18;

export default class TextboxWidget extends Widget {
    properties: TextWidgetProperties;
    htmlElement: HTMLDivElement;

    constructor() {
        const generalCategory: WidgetPropertyCategory = {
            label: "General",
            priority: 1,
        };
        const typographyCategory: WidgetPropertyCategory = {
            label: "Typography",
            priority: 2,
        };
        const seoCategory: WidgetPropertyCategory = {
            label: "SEO",
            priority: 3,
        };

        const propertyTypes: WidgetPropertyTypes = {
            text: {
                type: WidgetPropertyType.TEXT_EDITABLE,
                category: generalCategory,
            },
            size: {
                type: WidgetPropertyType.NUMBER,
                category: typographyCategory,
            },
            weight: {
                type: WidgetPropertyType.CHOICE,
                category: typographyCategory,
                choiceEnum: FontWeight,
            },
            type: {
                type: WidgetPropertyType.CHOICE,
                category: seoCategory,
                choiceEnum: TextType,
            },
        };

        super("div", propertyTypes);

        this.htmlElement.className = "text-box-widget";
        this.htmlElement.contentEditable = "true";

        this.setText("Textbox");
        this.setType(TextType.PARAGRAPH);
        this.setSize(DEFAULT_TEXT_SIZE);
        this.setWeight(FontWeight.FOUR_HUNDRED);

        this.properties.text.handleInspectorChange = (value: string) =>
            this.setText(value);
        this.properties.size.handleInspectorChange = (value: number) =>
            this.setSize(value);
        this.properties.weight.handleInspectorChange = (value: FontWeight) =>
            this.setWeight(value);
        this.properties.type.handleInspectorChange = (value: TextType) =>
            this.setType(value);
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
        this.setWeight(
            this.properties.weight.value.currentChoice as FontWeight
        );
        this.setType(this.properties.type.value.currentChoice as TextType);
    }
}
