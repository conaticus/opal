import { WidgetProperties, WidgetPropertyType } from "../../types";
import CustomElement from "../CustomElement";

interface WidgetPropertyTypes {
    [key: string]: WidgetPropertyType;
}

export default class Widget extends CustomElement {
    public properties: WidgetProperties;

    constructor(type: string = "div", public propertyTypes: WidgetPropertyTypes) {
        super(type);
        this.properties = {};
    }
}