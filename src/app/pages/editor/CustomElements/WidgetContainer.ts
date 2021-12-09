import { widgets } from "../globals";
import { WidgetType } from "../types";
import appendCustomElement from "../util/appendCustomElement";
import CustomElement from "./CustomElement";
import TextWidget from "./Widgets/TextWidget";
import Widget from "./Widgets/Widget";

export default class WidgetContainer extends CustomElement {
    public occupied: boolean;

    constructor(element: HTMLDivElement = null) {
        super();
        if (element) this.element = element;
        this.occupied = false;
        
        this.element.className = "widget-container";
        this.element.addEventListener("dragover", (e) => {
            if (this.occupied) return;
            e.preventDefault(); 
        });

        this.element.addEventListener("drop", (e) => {
            e.preventDefault();
            const widgetType = Number(e.dataTransfer.getData("widget-type")) as WidgetType;
            if (widgetType === undefined)
                return;

            this.createWidget(widgetType);
        })
    }

    private createWidget(widgetType: WidgetType): void {
        let widget: Widget;

        switch (widgetType) {
            case WidgetType.TEXT:
                widget = new TextWidget();
                break;
            default:
                return;
        }

        this.addWidget(widget);
    }

    public addWidget(widget: Widget): void {
        const widgetIndex = widgets.push(widget) - 1;
        appendCustomElement(this.element, widget);
        this.dispatchWidgetCreate(widgetIndex);
        this.occupied = true;
    }

    private dispatchWidgetCreate(widgetIndex: number) {
        const widgetEvent = new CustomEvent("widget-create", { detail: { widgetIndex } });
        this.element.dispatchEvent(widgetEvent);
    }
}