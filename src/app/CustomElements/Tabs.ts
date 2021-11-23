interface TabsObject {
    [key: string]: {
        button: HTMLButtonElement;
        element: HTMLElement;
    };
}

export default class Tabs {
    public element: HTMLDivElement;
    private buttonsContainer: HTMLDivElement;
    private childElementContainer: HTMLDivElement;
    private tabs: TabsObject;
    private currentTabSet: boolean;

    constructor() {
        this.element = document.createElement("div");
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

    public addTab(name: string, childElement: HTMLElement): void {
        if (this.tabs[name]) {
            console.error(`Tab '${name}' already exists.`);
            return;
        }

        const button = document.createElement("button") as HTMLButtonElement;
        button.innerText = name;
        this.buttonsContainer.appendChild(button);


        childElement.style.display = "none";
        this.childElementContainer.appendChild(childElement);

        this.tabs[name] = {
            button,
            element: childElement,
        };

        if (!this.currentTabSet) {
            this.setCurrentTab(name);
            this.currentTabSet = true;
        }

        button.addEventListener("click", () => {
            this.setCurrentTab(name);
        })
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