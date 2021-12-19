import Menu from "../CustomHtmlElements/Menus/Menu";
import appendCustomHtmlElement from "../util/appendCustomHtmlElement";

const inspector = new Menu("No element selected", false);
appendCustomHtmlElement(document.getElementsByTagName("main").item(0), inspector);

export { inspector };