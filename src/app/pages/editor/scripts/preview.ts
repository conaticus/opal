import ElementContainer from "../CustomHtmlElements/ElementContainer";
import ElementInspector from "../CustomHtmlElements/ElementInspector";
import appendCustomHtmlElement from "../util/appendCustomHtmlElement";
import { inspector } from "./inspector";

const elementContainers = document.getElementById("element-containers");

const createElementContainer = (): void => {
    const elementContainer = new ElementContainer();
    appendCustomHtmlElement(elementContainers, elementContainer);

    elementContainer.htmlElement.addEventListener("element-create", (e: CustomEvent) => {
        const elementInspector = new ElementInspector(e.detail.element);
        appendCustomHtmlElement(inspector, elementInspector);

        createElementContainer();
    })
}

createElementContainer();

export { elementContainers };