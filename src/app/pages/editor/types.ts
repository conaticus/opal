import { IpcRenderer } from "electron";
import * as filesys from "fs/promises";
import * as filesysSync from "fs";
import { shell as sh } from "electron";

export type { OpenDialogOptions } from "electron";

declare global {
    const ipc: IpcRenderer;
    const fs: typeof filesys;
    const fsSync: typeof filesysSync;
    const shell: {
        openExternal: typeof sh.openExternal;
        showItemInFolder: typeof sh.showItemInFolder;
    };
}

export enum WidgetPropertyType {
    TEXT_SHORT,
    TEXT_EDITABLE,
    CHOICE,
    NUMBER,
    BOOLEAN,
}

export interface WidgetPropertyTypes {
    [key: string]: {
        type: WidgetPropertyType;
        category: WidgetPropertyCategory;
        choiceEnum?: any;
    };
}

export interface WidgetPropertyChoice {
    currentChoice?: string;
    choiceEnum: any;
}

export interface WidgetProperty<ValueType> {
    value?: ValueType;
    disabled: boolean;
    category: WidgetPropertyCategory;
    handleInspectorChange?: Function;
}

export interface WidgetProperties {
    [key: string]: WidgetProperty<any>;
    identifier?: WidgetProperty<string>;
}

export interface TextWidgetProperties extends WidgetProperties {
    text: WidgetProperty<string>;
    type: WidgetProperty<WidgetPropertyChoice>;
    size: WidgetProperty<number>;
    weight: WidgetProperty<WidgetPropertyChoice>;
    resizeToType: WidgetProperty<boolean>;
}

export interface ContainerWidgetProperties extends WidgetProperties {
    padding: WidgetProperty<number>;
}

export interface WidgetSave {
    type: string;
    properties: any;
    propertyTypes: any;
}

export interface ProjectInfo {
    name: string;
    isOpal?: boolean;
    widgets: WidgetSave[];
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
    NINE_HUNDRED = "900",
}

export interface WidgetPropertyCategory {
    label: string;
    priority: number;
}

export enum WidgetType {
    TextBox = "TextboxWidget",
}
