import { ElementPropertyType, FontWeight, TextElementProperties, TextType } from "../../types";
import pxToNumber from "../../util/pxToNumber";
import Element from "./Element";

const DEFAULT_TEXT_SIZE = 18;

export default class TextBoxElement extends Element {
    properties: TextElementProperties;
    htmlElement: HTMLDivElement;

    constructor() {
        super("div", { text: ElementPropertyType.TEXT_SHORT, type: ElementPropertyType.CHOICE, size: ElementPropertyType.SLIDER, weight: ElementPropertyType.CHOICE });
        this.htmlElement.className = "text-box-element";
        this.htmlElement.contentEditable = "true";

        this.initialiseProperties();

        this.setText("Textbox");
        this.setType(TextType.PARAGRAPH);
        this.setSize(DEFAULT_TEXT_SIZE);
        this.setWeight(FontWeight.FOUR_HUNDRED);

        this.properties.text.handleInspectorChange = (value: string) => this.setText(value);
        this.properties.type.handleInspectorChange = (value: TextType) => this.setType(value);
        this.properties.size.handleInspectorChange = (value: number) => this.setSize(value);
        this.properties.weight.handleInspectorChange = (value: FontWeight) => this.setWeight(value);
    }

    protected initialiseProperties(): void {
        this.properties.text = { value: "", disabled: false, categoryLabel: "General" };
        this.properties.size = { value: pxToNumber(this.htmlElement.style.fontSize), disabled: false, categoryLabel: "Typography" };
        this.properties.type = { value: { choiceEnum: TextType }, disabled: false, categoryLabel: "SEO" };
        this.properties.weight = { value: { choiceEnum: FontWeight }, disabled: false, categoryLabel: "Typography" };
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
        this.setType(this.properties.type.value.currentChoice as TextType);
        this.setSize(this.properties.size.value);
        this.setWeight(this.properties.weight.value.currentChoice as FontWeight);
    }
}