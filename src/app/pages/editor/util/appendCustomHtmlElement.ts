import CustomElement from "../CustomHtmlElements/CustomElement";

/**
 * Append `customElement.element` as a child of `destination`
 * @param destination Destination HTMLElement
 * @param customElement Custom pouch element
 */
const appendCustomHtmlElement = (destination: HTMLElement | Node, customElement: CustomElement): void => {
   destination.appendChild(customElement.htmlElement); 
}

export default appendCustomHtmlElement;