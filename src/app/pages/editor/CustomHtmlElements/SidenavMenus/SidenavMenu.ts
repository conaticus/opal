import appendCustomElement from "../../util/appendCustomHtmlElement";
import CustomElement from "../CustomElement";
import IconButton from "../IconButton";

export default class SidenavMenu extends CustomElement {
    constructor(titleText: string) {
        super();
        this.htmlElement.className = "block";
        this.htmlElement.style.display = "none";
        this.htmlElement.style.borderLeft = "none";

        const title = document.createElement("div");
        title.className = "sidenav-item-title";

        const text = document.createElement("h4");
        text.innerText = titleText;
        text.style.marginLeft = "10px";

        const closeButton = new IconButton("./icons/Cross.svg");
        closeButton.htmlElement.style.marginRight = "10px";
        closeButton.htmlElement.addEventListener("click", () => {
            this.htmlElement.style.display = "none";
            const closeEvent = new CustomEvent("close");
            this.htmlElement.dispatchEvent(closeEvent);
        })

        title.appendChild(text);
        appendCustomElement(title, closeButton);
        this.htmlElement.appendChild(title);
    }

    public open(): void {
        this.htmlElement.style.display = "block";
    }

    public close(): void {
        this.htmlElement.style.display = "none";
    }
}