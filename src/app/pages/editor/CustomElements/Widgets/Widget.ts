import { SaveWidget, WidgetProperties, WidgetPropertyType } from "../../types";
import CustomElement from "../CustomElement";
import TextWidget from "./TextWidget";

interface WidgetPropertyTypes {
    [key: string]: WidgetPropertyType;
}

export default class Widget extends CustomElement {
    public properties: WidgetProperties;

    constructor(type: string = "div", public propertyTypes: WidgetPropertyTypes) {
        super(type);
        this.properties = {};
    }

    static generateFromSave(saveWidget: SaveWidget): Widget {
        let widget: Widget;
        switch (saveWidget.type) {
            case "TextWidget":
                widget = new TextWidget();
        }

        for (const propertyKey in saveWidget.properties) {
            widget.properties[propertyKey].value = saveWidget.properties[propertyKey];
        }

        widget.propertyTypes = saveWidget.propertyTypes;

        return widget;
    }
}