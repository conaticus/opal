import WidgetInspector from "../CustomHtmlElements/WidgetInspector";
import Menu from "../CustomHtmlElements/Menus/Menu";
import ContainerWidget from "../CustomHtmlElements/Widgets/Layout/ContainerWidget";
import Widget from "../CustomHtmlElements/Widgets/Widget";
import appendCustomHtmlElement from "../util/appendCustomHtmlElement";

const inspector = new Menu("No element selected", false);
appendCustomHtmlElement(
    document.getElementsByTagName("main").item(0),
    inspector
);

const widgetInspectors: WidgetInspector[] = [];

const showWidgetInspector = (widgetInspector: WidgetInspector) => {
    widgetInspectors.forEach((wInspector) => {
        wInspector.htmlElement.style.display = "none";
    });

    widgetInspector.htmlElement.style.display = "block";
};

const createInspector = (widget: Widget) => {
    const widgetInspector = new WidgetInspector(widget);
    widgetInspectors.push(widgetInspector);

    showWidgetInspector(widgetInspector);

    widget.htmlElement.addEventListener("click", () => {
        showWidgetInspector(widgetInspector);
    });

    inspector.titleText = widget.constructor.name;

    appendCustomHtmlElement(inspector.htmlElement, widgetInspector);
};

export { inspector, createInspector };
