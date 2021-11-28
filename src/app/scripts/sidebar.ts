import Tabs from "../CustomElements/Tabs";
import WidgetPreview from "../CustomElements/WidgetPreview";
import { WidgetType } from "../types";
import appendCustomElement from "../util/appendCustomElement";

const sidebar = document.getElementById("sidebar");
const tabs = new Tabs();

tabs.addTab("Widgets", new WidgetPreview("Text", WidgetType.TEXT).element);

const inspectorDefaultChild = document.createElement("p");
inspectorDefaultChild.innerText = "No widget is selected.";
tabs.addTab("Inspector", inspectorDefaultChild);

appendCustomElement(sidebar, tabs);

export { tabs };