import Dropdown from "../Dropdown";
import Grid from "../Grid";
import Menu from "./Menu";
import TextboxElement from "../OpalElements/Text/TextboxElement";
import OpalElement from "../OpalElements/OpalElement";
import ContainerElement from "../OpalElements/Layout/ContainerElement";

export default class AddElementMenu extends Menu {
    constructor() {
        super("Add Element");

        const typographyGrid = new Grid();
        this.addElement("Textbox", TextboxElement, typographyGrid);

        const layoutGrid = new Grid();
        this.addElement("Column", ContainerElement, layoutGrid);

        new Dropdown("Layout", this.htmlElement, layoutGrid.htmlElement);
        new Dropdown("Typography", this.htmlElement, typographyGrid.htmlElement);
        new Dropdown("Input", this.htmlElement, document.createElement("div"));
    }

    private addElement(label: string, elementType: typeof OpalElement, grid: Grid) {
        const htmlElement = document.createElement("h5");
        htmlElement.style.cursor = "grab";
        htmlElement.draggable = true;
        htmlElement.innerText = label;

        grid.addItem(htmlElement);
        htmlElement.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("element-type", String(elementType));
        })
    }
}