import { TextType, TextWidgetProperties, WidgetPropertyType } from "../../types";
import pxToNumber from "../../util/pxToNumber";
import Widget from "./Widget";

const DEFAULT_TEXT_SIZE = 18;

export default class TextWidget extends Widget {
    properties: TextWidgetProperties;
    element: HTMLTextAreaElement;

    constructor() {
        super("textarea", { text: WidgetPropertyType.TEXT_SHORT, type: WidgetPropertyType.CHOICE, size: WidgetPropertyType.SLIDER, resizeToType: WidgetPropertyType.BOOLEAN });
        this.element.className = "text-widget";

        this.initialiseProperties();

        this.setText("Text");
        this.setType(TextType.PARAGRAPH);
        this.setResizeToType(false);

        this.properties.text.handleInspectorChange = (value: string) => this.setText(value);
        this.properties.type.handleInspectorChange = (value: TextType) => this.setType(value);
        this.properties.size.handleInspectorChange = (value: number) => this.setSize(value);
        this.properties.resizeToType.handleInspectorChange = (value: boolean) => this.setResizeToType(value);
    }

    private initialiseProperties() {
        this.properties.type = { value: { choiceEnum: TextType }, disabled: false };
        this.properties.text = { value: "", disabled: false };
        this.properties.size = { value: pxToNumber(this.element.style.fontSize), disabled: false };
        this.properties.resizeToType = { value: false, disabled: false };
    }

    public setText(value: string): void {
        this.properties.text.value = value;
        this.element.value = value;
    }

    public setSize(value: number): void {
        this.element.style.fontSize = value + "px";
        this.properties.size.value = value;
    }

    public setType(value: TextType): void {
        this.properties.type.value.currentChoice = value;
        if (!this.properties.resizeToType.value) return;
        
        switch (value) {
            case TextType.HEADING_ONE:
                this.setSize(60);
                break;
            case TextType.HEADING_TWO:
                this.setSize(50)
                break;
            case TextType.HEADING_THREE:
                this.setSize(45);
                break;
            case TextType.HEADING_FOUR:
                this.setSize(40);
                break;
            case TextType.HEADING_FIVE:
                this.setSize(35);
                break;
            case TextType.HEADING_SIX:
                this.setSize(30)
                break;
            case TextType.PARAGRAPH:
                this.setSize(18);
                break;
            default: break;
        }
    }

    public setResizeToType(value: boolean): void {
        this.properties.resizeToType.value = value;
        if (value) {
            this.setType(this.properties.type.value.currentChoice as TextType);
            this.disableProperty("size");
        } else {
            this.setSize(DEFAULT_TEXT_SIZE);
            this.enableProperty("size");
        }
    }

    public loadProperties(): void {
        this.setText(this.properties.text.value);
        this.setType(this.properties.type.value.currentChoice as TextType);
        this.setResizeToType(this.properties.resizeToType.value);
        if (!this.properties.resizeToType.value) {
            this.setSize(this.properties.size.value);
        }
    }
}