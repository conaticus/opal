import { createInspector } from "../scripts/inspector";
import appendCustomHtmlElement from "../util/appendCustomHtmlElement";
import { state } from "../util/state";
import CustomElement from "./CustomElement";
import TextboxWidget from "./Widgets/Text/TextboxWidget";
import Widget from "./Widgets/Widget";

class OpalBody extends CustomElement {
    constructor() {
        super("div");
        this.htmlElement.style.height = "100vh";
        appendCustomHtmlElement(document.getElementById("preview"), this);

        this.htmlElement.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        this.htmlElement.addEventListener("dragenter", () => {
            this.hover(this, 2);
        });

        this.htmlElement.addEventListener("mouseenter", () => {
            this.hover(this, 2);
        });

        this.htmlElement.addEventListener("mouseleave", () => {
            this.unhover(this);
        });

        this.htmlElement.addEventListener("dragleave", () => {
            this.unhover(this);
        });

        this.htmlElement.addEventListener("drop", async (e) => {
            e.preventDefault();
            const widgetType = e.dataTransfer.getData("widget-type");
            await this.createWidget(widgetType);
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

        this.addWidget(widget);
    }

    public addWidget(widget: Widget): void {
        createInspector(widget);
        appendCustomHtmlElement(this.htmlElement, widget);

        widget.htmlElement.addEventListener("mouseenter", () => {
            this.unhover(this);
            this.hover(widget);
        });

        widget.htmlElement.addEventListener("mouseleave", () => {
            this.unhover(widget);
            this.hover(this, 2);
        });

        state.widgets.push(widget);
    }

    private hover(el: CustomElement, borderSize = 1) {
        el.htmlElement.style.outline = `solid ${borderSize}px #0084ff`;
    }

    private unhover(el: CustomElement) {
        el.htmlElement.style.outline = "none";
    }
}

export default OpalBody;
