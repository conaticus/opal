import Dropdown from "../Dropdown";
import Element from "../OpalElements/Element";
import Grid from "../Grid";
import Menu from "./Menu";
import TextElement from "../OpalElements/Text/TextboxElement";

export default class AddElementMenu extends Menu {
    constructor() {
        super("Add Element");

        const typographyGrid = new Grid();
        this.addElement("Textbox", TextElement, typographyGrid);
        // this.addElement("Heading");
        // this.addElement("Paragraph");

        new Dropdown("Layout", this.htmlElement, document.createElement("div"));
        new Dropdown("Typography", this.htmlElement, typographyGrid.htmlElement);
        new Dropdown("Input", this.htmlElement, document.createElement("div"));
    }

    private addElement(label: string, elementType: typeof Element, grid: Grid) {
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