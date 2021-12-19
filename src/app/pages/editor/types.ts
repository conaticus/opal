import { IpcRenderer } from "electron";
import * as filesystem from "fs/promises";
import * as filesystemSync from "fs";
import { shell as sh } from "electron";

export type { OpenDialogOptions } from "electron";

declare global {
    const ipc: IpcRenderer;
    const fs: typeof filesystem;
    const fsSync: typeof filesystemSync;
    const shell: {
        openExternal: typeof sh.openExternal;
        showItemInFolder: typeof sh.showItemInFolder;
    }
}

export enum ElementPropertyType {
    TEXT_SHORT,
    TEXT_EDITABLE,
    CHOICE,
    NUMBER,
    BOOLEAN,
}

export interface ElementPropertyTypes {
    [key: string]: {
        type: ElementPropertyType;
        category: ElementPropertyCategory;
        choiceEnum?: any;
    };
}

export interface ElementPropertyChoice {
    currentChoice?: string;
    choiceEnum: any;
}

export interface ElementProperty<ValueType> {
    value?: ValueType;
    disabled: boolean;
    category: ElementPropertyCategory;
    handleInspectorChange?: Function;
}

export interface ElementProperties {
    [key: string]: ElementProperty<any>;
    identifier?: ElementProperty<string>;
}

export interface TextElementProperties extends ElementProperties {
    text: ElementProperty<string>;
    type: ElementProperty<ElementPropertyChoice>;
    size: ElementProperty<number>;
    weight: ElementProperty<ElementPropertyChoice>;
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

export enum FontWeight {
    ONE_HUNDRED = "100",
    TWO_HUNDRED = "200",
    THREE_HUNDRED = "300",
    FOUR_HUNDRED = "400",
    FIVE_HUNDRED = "500",
    SIX_HUNDRED = "600",
    SEVEN_HUNDRED = "700",
    EIGHT_HUNDRED = "800",
    NINE_HUNDRED = "900"
}

export interface ElementPropertyCategory {
    label: string;
    priority: number;
}

export enum ElementType {
    TextBox = "TextBoxElement",
}