import TextboxWidget from "../Text/TextboxWidget";
import Widget from "../Widget";
import appendCustomHtmlElement from "../../../util/appendCustomHtmlElement";
import { state } from "../../../util/state";
import {
    ContainerWidgetProperties,
    WidgetPropertyCategory,
    WidgetPropertyType,
    WidgetPropertyTypes,
} from "../../../types";
import { createInspector } from "../../../scripts/inspector";

export default class ContainerWidget extends Widget {
    properties: ContainerWidgetProperties;
    public occupied: boolean;

    constructor() {
        const positionCategory: WidgetPropertyCategory = {
            label: "Position",
            priority: 1,
        };

        const propertyTypes: WidgetPropertyTypes = {
            padding: {
                type: WidgetPropertyType.NUMBER,
                category: positionCategory,
            },
        };

        super("div", propertyTypes);

        this.properties.padding.handleInspectorChange = (value: number) =>
            this.setPadding(value);

        this.htmlElement.style.height = "50px";

        this.occupied = false;

        this.htmlElement.addEventListener("dragover", (e) => {
            if (this.occupied) return;
            e.preventDefault();
        });

        this.htmlElement.addEventListener("dragenter", () => {
            if (this.occupied) return;
            this.htmlElement.style.outline = "solid 1px #0084ff";
        });

        this.htmlElement.addEventListener("dragleave", () => {
            if (this.occupied) return;
            this.htmlElement.style.outline = "none";
        });

        this.htmlElement.addEventListener(
            "drop",
            async (e) => {
                if (this.occupied) return;
                e.preventDefault();
                const widgetType = e.dataTransfer.getData("widget-type");
                await this.createWidget(widgetType);
            },
            { once: true }
        );
    }

    private setPadding(value: number): void {
        this.properties.padding.value = value;
        this.htmlElement.style.padding = value + "px";
    }

    private hover(widget: Widget) {
        widget.htmlElement.style.outline = "solid 1px #0084ff";
    }

    private unhover(widget: Widget) {
        widget.htmlElement.style.outline = "none";
    }

    private widgetAdded(): void {
        this.htmlElement.style.height = "auto";

        this.htmlElement.addEventListener("mouseenter", () => {
            this.hover(this);
        });

        this.htmlElement.addEventListener("mouseleave", () => {
            this.unhover(this);
        });
    }

    private async createWidget(widgetType: string): Promise<void> {
        let widget: Widget;

        switch (widgetType) {
            case String(TextboxWidget):
                widget = new TextboxWidget();
                break;
            default:
                return;
        }

        await this.addWidget(widget);
    }

    public async addWidget(widget: Widget): Promise<void> {
        createInspector(widget);
        appendCustomHtmlElement(this.htmlElement, widget);

        widget.htmlElement.addEventListener("mouseenter", () => {
            this.unhover(this);
            this.hover(widget);
        });

        widget.htmlElement.addEventListener("mouseleave", () => {
            this.unhover(widget);
            this.hover(this);
        });

        state.widgets.push(widget);
        this.occupied = true;

        this.widgetAdded();
    }

    public loadProperties(): void {
        this.setPadding(this.properties.padding.value);
    }
}
