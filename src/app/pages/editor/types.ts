import { IpcRenderer } from "electron";
import * as filesystem from "fs/promises";
import * as filesystemSync from "fs";
import { shell as sh } from "electron";

export type { OpenDialogOptions } from "electron";

declare global {
    const ipc: IpcRenderer;
    const fs: typeof filesystem;
    const fsSync: {
        readFile: typeof filesystemSync.readFileSync;
    }
    const shell: {
        openExternal: typeof sh.openExternal;
        showItemInFolder: typeof sh.showItemInFolder;
    }
}

export enum WidgetType {
    TEXT,
}

export enum WidgetPropertyType {
    TEXT_SHORT,
    CHOICE,
    SLIDER,
    BOOLEAN,
}

    export interface WidgetPropertyTypes {
    [key: string]: WidgetPropertyType;
}

export interface WidgetPropertyChoice {
    currentChoice?: string;
    choiceEnum: any;
}

export interface WidgetProperty<ValueType> {
    value: ValueType;
    disabled: boolean;
    handleInspectorChange?: Function;
}

export interface WidgetProperties {
    [key: string]: WidgetProperty<any>;
}

export interface TextWidgetProperties extends WidgetProperties {
    text: WidgetProperty<string>;
    type: WidgetProperty<WidgetPropertyChoice>;
    size: WidgetProperty<number>;
    resizeToType: WidgetProperty<boolean>;
}

export interface SaveWidget {
    type: string;
    properties: any;
    propertyTypes: any;
}

export interface ProjectInfo {
    name: string;
    isOpal?: boolean;
    widgets: SaveWidget[]
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