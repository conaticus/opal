import ElementContainer from "../CustomHtmlElements/ElementContainer";
import ElementInspector from "../CustomHtmlElements/ElementInspector";
import appendCustomHtmlElement from "../util/appendCustomHtmlElement";
import { inspector } from "./inspector";

const elementContainers = document.getElementById("element-containers");
const elementInspectors: ElementInspector[] = [];

const showElementInspector = (elementInspector: ElementInspector) => {
    elementInspectors.forEach(elInspector => {
        elInspector.htmlElement.style.display = "none";
    })

    elementInspector.htmlElement.style.display = "block";
}

const createElementContainer = (): void => {
    const elementContainer = new ElementContainer();
    appendCustomHtmlElement(elementContainers, elementContainer);

    elementContainer.htmlElement.addEventListener("element-add", (e: CustomEvent) => {
        elementContainer.occupied = true; // if created on load this needs to be set manually

        const elementInspector = new ElementInspector(e.detail.element);
        elementInspectors.push(elementInspector);

        showElementInspector(elementInspector);

        // Doing it like this allows the user to click inside the widget container
        elementContainer.htmlElement.addEventListener("mouseenter", () => {
            onclick = () => {
                showElementInspector(elementInspector);
            }
        })

        elementContainer.htmlElement.addEventListener("mouseleave", () => {
            onclick = () => {};
        })

        elementContainer.htmlElement.addEventListener("click", () => {
            showElementInspector(elementInspector);
        })

        inspector.titleText = e.detail.element.constructor.name;

        appendCustomHtmlElement(inspector.htmlElement, elementInspector);
        createElementContainer();
    })
}

export { elementContainers, createElementContainer };