import WidgetContainer from "../CustomElements/WidgetContainer";
import Widget from "../CustomElements/Widgets/Widget";
import { ProjectInfo } from "../types";
import { widgetContainers } from "./preview";

const projectInfoRaw = fsSync.readFile(`${localStorage.getItem("currentProjectDirectory")}/project-info.json`, "utf8");
const projectInfo = <ProjectInfo>JSON.parse(projectInfoRaw);
document.title = `Opal - ${projectInfo.name}`;

projectInfo.widgets.forEach(widget => {
    const widgetContainer = new WidgetContainer(widgetContainers.lastChild as HTMLDivElement);
    widgetContainer.addWidget(Widget.generateFromSave(widget));
})

export { projectInfo };