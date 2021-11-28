export enum WidgetType {
    TEXT,
}

export enum WidgetPropertyType {
    TEXT_SHORT,
}

export interface WidgetProperties {
    [key: string]: any;
}

export interface TextWidgetProperties extends WidgetProperties {
    text: string;
}