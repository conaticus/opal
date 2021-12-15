import ElementContainer from "../CustomHtmlElements/ElementContainer";
import Element from "../CustomHtmlElements/OpalElements/Element";
import { ProjectInfo } from "../types";
import { elementContainers } from "./preview";

const projectInfoRaw = fsSync.readFile(`${localStorage.getItem("currentProjectDirectory")}/project-info.json`, "utf8");
const projectInfo = <ProjectInfo>JSON.parse(projectInfoRaw);
document.title = `Opal - ${projectInfo.name}`;

projectInfo.elements.forEach(element => {
    const elementContainer = new ElementContainer(elementContainers.lastChild as HTMLDivElement);
    const generatedWidget = Element.generateFromSave(element);
    generatedWidget.loadProperties();
    elementContainer.addElement(generatedWidget);
})

export { projectInfo };