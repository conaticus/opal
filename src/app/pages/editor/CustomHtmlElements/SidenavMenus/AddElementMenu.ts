import Dropdown from "../Dropdown";
import Element from "../OpalElements/Element";
import Grid from "../Grid";
import SidenavMenu from "./SidenavMenu";
import TextElement from "../OpalElements/TextElement";

export default class AddElementMenu extends SidenavMenu {
    typographyGrid: Grid;

    constructor() {
        super("Add Element");

        this.typographyGrid = new Grid();
        this.addElement("Text", TextElement);
        // this.addElement("Heading");
        // this.addElement("Paragraph");

        new Dropdown("Layout", this.htmlElement, document.createElement("div"));
        new Dropdown("Typography", this.htmlElement, this.typographyGrid.htmlElement);
        new Dropdown("Input", this.htmlElement, document.createElement("div"));
    }

    private addElement(label: string, elementType: typeof Element) {
        const htmlElement = document.createElement("h5");
        htmlElement.style.cursor = "grab";
        htmlElement.draggable = true;
        htmlElement.innerText = label;

        this.typographyGrid.addItem(htmlElement);
        htmlElement.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("element-type", String(elementType));
        })
    }
}