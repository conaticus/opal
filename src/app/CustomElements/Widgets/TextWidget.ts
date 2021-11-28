import { TextWidgetProperties, WidgetPropertyType } from "../../types";
import Widget from "./Widget";

export default class TextWidget extends Widget {
    properties: TextWidgetProperties;
    element: HTMLTextAreaElement;

    constructor() {
        super("textarea", { text: WidgetPropertyType.TEXT_SHORT });
        this.element.className = "text-widget";

        this.setText("Text");
    }

    public setText(value: string) {
        this.properties.text = value;
        this.element.value = value;
    }
}