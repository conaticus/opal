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

export enum ElementPropertyType {
    TEXT_SHORT,
    CHOICE,
    SLIDER,
    BOOLEAN,
}

export interface ElementPropertyTypes {
    [key: string]: ElementPropertyType;
}

export interface ElementPropertyChoice {
    currentChoice?: string;
    choiceEnum: any;
}

export interface ElementProperty<ValueType> {
    value: ValueType;
    disabled: boolean;
    handleInspectorChange?: Function;
}

export interface ElementProperties {
    [key: string]: ElementProperty<any>;
}

export interface TextElementProperties extends ElementProperties {
    text: ElementProperty<string>;
    type: ElementProperty<ElementPropertyChoice>;
    size: ElementProperty<number>;
    resizeToType: ElementProperty<boolean>;
}

export interface ElementSave {
    type: string;
    properties: any;
    propertyTypes: any;
}

export interface ProjectInfo {
    name: string;
    isOpal?: boolean;
    elements: ElementSave[]
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