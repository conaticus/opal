import { ElementPropertyType, TextElementProperties, TextType } from "../../types";
import pxToNumber from "../../util/pxToNumber";
import Element from "./Element";

const DEFAULT_TEXT_SIZE = 18;

export default class TextBoxElement extends Element {
    properties: TextElementProperties;
    htmlElement: HTMLDivElement;

    constructor() {
        super("div", { text: ElementPropertyType.TEXT_SHORT, type: ElementPropertyType.CHOICE, size: ElementPropertyType.SLIDER });
        this.htmlElement.className = "text-box-element";
        this.htmlElement.contentEditable = "true";

        this.initialiseProperties();

        this.setText("Text");
        this.setType(TextType.PARAGRAPH);
        this.setSize(DEFAULT_TEXT_SIZE);

        this.properties.text.handleInspectorChange = (value: string) => this.setText(value);
        this.properties.type.handleInspectorChange = (value: TextType) => this.setType(value);
        this.properties.size.handleInspectorChange = (value: number) => this.setSize(value);
    }

    protected initialiseProperties(): void {
        this.properties.type = { value: { choiceEnum: TextType }, disabled: false };
        this.properties.text = { value: "", disabled: false };
        this.properties.size = { value: pxToNumber(this.htmlElement.style.fontSize), disabled: false };
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

    public loadProperties(): void {
        this.setText(this.properties.text.value);
        this.setType(this.properties.type.value.currentChoice as TextType);
        this.setSize(this.properties.size.value);
    }
}