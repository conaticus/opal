import CustomElement from "./CustomElement";

interface TabsObject {
    [key: string]: {
        button: HTMLButtonElement;
        htmlElement: HTMLElement;
        defaultHtmlElement: HTMLElement;
    };
}

export default class Tabs extends CustomElement {
    private buttonsContainer: HTMLDivElement;
    private childElementContainer: HTMLDivElement;
    private tabs: TabsObject;
    private currentTabSet: boolean;

    constructor() {
        super();
        this.htmlElement.className = "tabs";

        this.buttonsContainer = document.createElement("div");
        this.buttonsContainer.className = "buttons-container";
        this.htmlElement.appendChild(this.buttonsContainer);

        this.childElementContainer = document.createElement("div");
        this.childElementContainer.className = "child-element-container";
        this.htmlElement.appendChild(this.childElementContainer);

        this.tabs = {};
        this.currentTabSet = false;
    }

    public addTab(name: string, defaultHtmlElement: HTMLElement): void {
        if (this.tabs[name]) {
            console.error(`Tab '${name}' already exists.`);
            return;
        }

        const button = document.createElement("button") as HTMLButtonElement;
        button.innerText = name;
        this.buttonsContainer.appendChild(button);


        defaultHtmlElement.style.display = "none";
        
        this.childElementContainer.appendChild(defaultHtmlElement);
        this.tabs[name] = {
            button,
            htmlElement: defaultHtmlElement,
            defaultHtmlElement,
        };

        if (!this.currentTabSet) {
            this.setCurrentTab(name);
            this.currentTabSet = true;
        }

        button.addEventListener("click", () => {
            this.setCurrentTab(name);
        })
    }

    public setChildElement(tabName: string, element: HTMLElement): void {
        this.childElementContainer.childNodes.forEach(child => {
            if (child === this.tabs[tabName].htmlElement)
                child.remove();
        })

        this.childElementContainer.appendChild(element);
        this.tabs[tabName].htmlElement = element;
    }

    public setChildDefault(tabName: string) {
        const tab = this.tabs[tabName];
        this.setChildElement(tabName, tab.defaultHtmlElement);
    }

    public setCurrentTab(name: string): void {
        if (!this.tabs[name]) {
            console.error(`Tab '${name}' does not exist.`);
            return;
        }

        for (const tabKey in this.tabs) {
            const { htmlElement: tab } = this.tabs[tabKey];

            if (tabKey === name) {
                tab.style.display = "block";
            } else {
                tab.style.display = "none";
            }
        }
    }
}