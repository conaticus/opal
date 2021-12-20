import ElementContainer from "../CustomHtmlElements/ElementContainer";
import Element from "../CustomHtmlElements/OpalElements/Element";
import { ProjectInfo } from "../types";
import { getState, setState } from "../util/state";
import { elementContainers } from "./preview";

const load = async (): Promise<void> => {
    const projectInfoRaw = await fs.readFile(`${await getState("currentProjectDirectory")}/project-info.json`, "utf8");
    const projectInfo = <ProjectInfo>JSON.parse(projectInfoRaw);
    await setState("projectInfo", projectInfo);

    document.title = `Opal - ${projectInfo.name}`;

    projectInfo.elements.forEach(async (element) => {
        const elementContainer = new ElementContainer(elementContainers.lastChild as HTMLDivElement);
        const generatedWidget = Element.generateFromSave(element);
        generatedWidget.loadProperties();
        await elementContainer.addElement(generatedWidget);
    })
}

load();

export default load;