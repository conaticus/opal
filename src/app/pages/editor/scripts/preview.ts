import WidgetContainer from "../CustomElements/WidgetContainer";
import appendCustomElement from "../util/appendCustomElement";
import WidgetInspector from "../CustomElements/WidgetInspector";
import { tabs } from "./sidebar";

const widgetContainers = document.getElementById("widget-containers");

const createWidgetContainer = () => {
    const container = new WidgetContainer();
    appendCustomElement(widgetContainers, container);

    container.element.addEventListener("widget-create", (e: CustomEvent) => {
        const widgetInspector = new WidgetInspector(e.detail.widget);

        tabs.setChildElement("Inspector", widgetInspector.element);
        tabs.setCurrentTab("Inspector");

        createWidgetContainer();
    })
}

createWidgetContainer();

export { widgetContainers };