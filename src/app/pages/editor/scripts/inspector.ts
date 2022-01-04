import ElementInspector from "../CustomHtmlElements/ElementInspector";
import Menu from "../CustomHtmlElements/Menus/Menu";
import ContainerElement, { elementContainers } from "../CustomHtmlElements/OpalElements/Layout/ContainerElement";
import OpalElement from "../CustomHtmlElements/OpalElements/OpalElement";
import appendCustomHtmlElement from "../util/appendCustomHtmlElement";

const inspector = new Menu("No element selected", false);
appendCustomHtmlElement(document.getElementsByTagName("main").item(0), inspector);

const elementInspectors: ElementInspector[] = [];

const showElementInspector = (elementInspector: ElementInspector) => {
    elementInspectors.forEach(elInspector => {
        elInspector.htmlElement.style.display = "none";
    })

    elementInspector.htmlElement.style.display = "block";
}

const createInspector = (element: OpalElement, elementContainer: ContainerElement) => {
    const elementInspector = new ElementInspector(element);
    elementInspectors.push(elementInspector);

    showElementInspector(elementInspector);

    element.htmlElement.addEventListener("click", () => {
        showElementInspector(elementInspector);
    })

    inspector.titleText = element.constructor.name;

    appendCustomHtmlElement(inspector.htmlElement, elementInspector);
}

export { inspector, createInspector };