import CustomElement from "./CustomElement";

/**
 * Automatically inserts to parent as required to in order to function correctly
 */
export default class Dropdown extends CustomElement {
    constructor(label: string, parent: HTMLElement, child: HTMLElement, private isDropped: boolean = true) {
        super();
        this.htmlElement.className = "dropdown";

        const arrowElement = document.createElement("img");
        arrowElement.src = "./icons/DropdownArrow.svg";
        arrowElement.style.margin = "0 10px";
        arrowElement.style.transform = "rotate(180deg)";

        const text = document.createElement("h5");
        text.innerText = label;

        this.htmlElement.appendChild(arrowElement);
        this.htmlElement.appendChild(text);

        parent.appendChild(this.htmlElement);
        parent.insertBefore(child, this.htmlElement.nextSibling);

        this.htmlElement.addEventListener("click", () => {
            if (this.isDropped) {
                arrowElement.style.transform = "rotate(0deg)";
                child.remove();
            } else {
                arrowElement.style.transform = "rotate(180deg)";
                parent.insertBefore(child, this.htmlElement.nextSibling);
            }

            this.isDropped = !this.isDropped;
        })
    }
}