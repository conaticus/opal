import Tabs from "../CustomElements/Tabs";
import appendCustomElement from "../util/appendCustomElement";

const sidebar = document.getElementById("sidebar");
const tabs = new Tabs();

const textWidget = document.createElement("h1");
textWidget.innerText = "Text";
tabs.addTab("Widgets", textWidget);

const inspectorHeading = document.createElement("h1");
inspectorHeading.innerText = "Welcome to the inspector";
tabs.addTab("Inspector", inspectorHeading);

appendCustomElement(sidebar, tabs);