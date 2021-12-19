import appendCustomElement from "../../util/appendCustomHtmlElement";
import CustomElement from "../CustomElement";
import IconButton from "../IconButton";

export default class Menu extends CustomElement {
    private titleTextElement: HTMLHeadingElement;

    constructor(titleTxt: string, isHidden = true) {
        super();
        this.htmlElement.className = "block";
        if (isHidden) this.htmlElement.style.display = "none";
        this.htmlElement.style.borderLeft = "none";

        const title = document.createElement("div");
        title.className = "sidenav-item-title";

        const text = document.createElement("h4");
        text.style.color = "#C5C5C5";
        text.innerText = titleTxt;
        text.style.marginLeft = "10px";

        this.titleTextElement = text;

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

    public set titleText(text: string) {
        this.titleTextElement.innerText = text;
    }
}