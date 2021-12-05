import { TextWidgetProperties, WidgetPropertyType } from "../../types";
import pxToNumber from "../../util/pxToNumber";
import Widget from "./Widget";

enum TextType {
    HEADING_ONE = "Heading One",
    HEADING_TWO = "Heading Two",
    HEADING_THREE = "Heading Three",
    HEADING_FOUR = "Heading Four",
    HEADING_FIVE = "Heading Five",
    HEADING_SIX = "Heading Six",
    PARAGRAPH = "Paragraph",
}

export default class TextWidget extends Widget {
    properties: TextWidgetProperties;
    element: HTMLTextAreaElement;

    constructor() {
        super("textarea", { text: WidgetPropertyType.TEXT_SHORT, type: WidgetPropertyType.CHOICE, size: WidgetPropertyType.SLIDER });
        this.element.className = "text-widget";

        this.initialiseProperties();

        this.setText("Text");
        this.setType(TextType.PARAGRAPH);

        this.properties.text.handleInspectorChange = (value: string) => this.setText(value);
        this.properties.type.handleInspectorChange = (value: TextType) => this.setType(value);
        this.properties.size.handleInspectorChange = (value: number) => this.element.style.fontSize = value + "px";
    }

    private initialiseProperties() {
        this.properties.type = { value: { choiceEnum: TextType } };
        this.properties.text = { value: "" };
        this.properties.size = { value: pxToNumber(this.element.style.fontSize) };
    }

    public setText(value: string) {
        this.properties.text.value = value;
        this.element.value = value;
    }

    public setType(value: TextType) {
        this.properties.type.value.currentChoice = value;
        switch (value) {
            case TextType.HEADING_ONE:
                this.element.className = "text-widget text-widget-h1";
                break;
            case TextType.HEADING_TWO:
                this.element.className = "text-widget text-widget-h2";
                break;
            case TextType.HEADING_THREE:
                this.element.className = "text-widget text-widget-h3";
                break;
            case TextType.HEADING_FOUR:
                this.element.className = "text-widget text-widget-h4";
                break;
            case TextType.HEADING_FIVE:
                this.element.className = "text-widget text-widget-h5";
                break;
            case TextType.HEADING_SIX:
                this.element.className = "text-widget text-widget-h6";
                break;
            case TextType.PARAGRAPH:
                this.element.className = "text-widget text-widget-p";
                break;
            default: break;
        }
    }
}