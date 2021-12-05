import CustomElement from "./CustomElement";

interface TabsObject {
    [key: string]: {
        button: HTMLButtonElement;
        element: HTMLElement;
        defaultElement: HTMLElement;
    };
}

export default class Tabs extends CustomElement {
    private buttonsContainer: HTMLDivElement;
    private childElementContainer: HTMLDivElement;
    private tabs: TabsObject;
    private currentTabSet: boolean;

    constructor() {
        super();
        this.element.className = "tabs";

        this.buttonsContainer = document.createElement("div");
        this.buttonsContainer.className = "buttons-container";
        this.element.appendChild(this.buttonsContainer);

        this.childElementContainer = document.createElement("div");
        this.childElementContainer.className = "child-element-container";
        this.element.appendChild(this.childElementContainer);

        this.tabs = {};
        this.currentTabSet = false;
    }

    public addTab(name: string, defaultElement: HTMLElement): void {
        if (this.tabs[name]) {
            console.error(`Tab '${name}' already exists.`);
            return;
        }

        const button = document.createElement("button") as HTMLButtonElement;
        button.innerText = name;
        this.buttonsContainer.appendChild(button);


        defaultElement.style.display = "none";
        
        this.childElementContainer.appendChild(defaultElement);
        this.tabs[name] = {
            button,
            element: defaultElement,
            defaultElement,
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
            if (child === this.tabs[tabName].element)
                child.remove();
        })

        this.childElementContainer.appendChild(element);
        this.tabs[tabName].element = element;
    }

    public setChildDefault(tabName: string) {
        const tab = this.tabs[tabName];
        this.setChildElement(tabName, tab.defaultElement);
    }

    public setCurrentTab(name: string): void {
        if (!this.tabs[name]) {
            console.error(`Tab '${name}' does not exist.`);
            return;
        }

        for (const tabKey in this.tabs) {
            const { element: tab } = this.tabs[tabKey];

            if (tabKey === name) {
                tab.style.display = "block";
            } else {
                tab.style.display = "none";
            }
        }
    }
}