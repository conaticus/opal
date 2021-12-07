import { IpcRenderer, Shell } from "electron";
import * as filesystem from "fs/promises";
import { shell as sh } from "electron";

export type { OpenDialogOptions } from "electron";

declare global {
    const ipc: IpcRenderer;
    const fs: typeof filesystem;
    const shell: {
        openExternal: typeof sh.openExternal;
    }
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

export interface ProjectInfo {
    name: string;
    isOpal?: boolean;
}

export enum TextType {
    HEADING_ONE = "Heading One",
    HEADING_TWO = "Heading Two",
    HEADING_THREE = "Heading Three",
    HEADING_FOUR = "Heading Four",
    HEADING_FIVE = "Heading Five",
    HEADING_SIX = "Heading Six",
    PARAGRAPH = "Paragraph",
}