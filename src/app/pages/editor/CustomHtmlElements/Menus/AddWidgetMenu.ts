import Dropdown from "../Dropdown";
import Grid from "../Grid";
import Menu from "./Menu";
import TextboxWidget from "../Widgets/Text/TextboxWidget";
import Widget from "../Widgets/Widget";
import ContainerWidget from "../Widgets/Layout/ContainerWidget";

export default class AddWidgetMenu extends Menu {
    constructor() {
        super("Add Widget");

        const typographyGrid = new Grid();
        this.addWidget("Textbox", TextboxWidget, typographyGrid);

        const layoutGrid = new Grid();
        this.addWidget("Column", ContainerWidget, layoutGrid);

        new Dropdown("Layout", this.htmlElement, layoutGrid.htmlElement);
        new Dropdown(
            "Typography",
            this.htmlElement,
            typographyGrid.htmlElement
        );
        new Dropdown("Input", this.htmlElement, document.createElement("div"));
    }

    private addWidget(label: string, widgetType: typeof Widget, grid: Grid) {
        const htmlElement = document.createElement("h5");
        htmlElement.style.cursor = "grab";
        htmlElement.draggable = true;
        htmlElement.innerText = label;

        grid.addItem(htmlElement);
        htmlElement.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("widget-type", String(widgetType));
        });
    }
}
