import { WidgetType } from "../types";
import CustomElement from "./CustomElement";

export default class WidgetPreview extends CustomElement {
    public element: HTMLDivElement;

    constructor(public name: string, public type: WidgetType) {
        super();
        this.element.className = "widget-preview";
        this.element.innerText = name;
        this.element.draggable = true;
        this.element.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("widget-type", String(type));
        })
    }
}