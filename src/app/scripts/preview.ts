import WidgetContainer from "../CustomElements/WidgetContainer";
import appendCustomElement from "../util/appendCustomElement";
import WidgetInspector from "../CustomElements/WidgetInspector";
import { tabs } from "./sidebar";

const preview = document.getElementById("preview");
const widgetContainer = new WidgetContainer();
appendCustomElement(preview, widgetContainer);
widgetContainer.element.addEventListener("widget-create", (e: CustomEvent) => {
    const widgetInspector = new WidgetInspector(e.detail.widget);

    tabs.setChildElement("Inspector", widgetInspector.element);
    tabs.setCurrentTab("Inspector");
})