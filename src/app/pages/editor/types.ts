import { IpcRenderer } from "electron";

declare global {
    const ipc: IpcRenderer;
}

export enum WidgetType {
    TEXT,
}

export enum WidgetPropertyType {
    TEXT_SHORT,
    CHOICE,
    SLIDER,
}

export interface WidgetPropertyChoice {
    currentChoice?: string;
    choiceEnum: any;
}

export interface WidgetProperty<ValueType> {
    value: ValueType;
    handleInspectorChange?: Function;
}

export interface WidgetProperties {
    [key: string]: WidgetProperty<any>;
}

export interface TextWidgetProperties extends WidgetProperties {
    text: WidgetProperty<string>;
    type: WidgetProperty<WidgetPropertyChoice>;
    size: WidgetProperty<number>;
}