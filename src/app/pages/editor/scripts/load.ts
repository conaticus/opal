import ElementContainer from "../CustomHtmlElements/ElementContainer";
import Element from "../CustomHtmlElements/OpalElements/Element";
import { ProjectInfo } from "../types";
import { state } from "../util/state";
import { elementContainers } from "./preview";

const load = async (): Promise<void> => {
    const projectInfoRaw = await fs.readFile(`${state.currentProjectDirectory}/project-info.json`, "utf8");
    const projectInfo = <ProjectInfo>JSON.parse(projectInfoRaw);
    state.projectInfo = projectInfo;

    document.title = `Opal - ${projectInfo.name}`;

    console.log(state.projectInfo.elements);

    state.projectInfo.elements.forEach(async (element) => {
        const elementContainer = new ElementContainer(elementContainers.lastChild as HTMLDivElement);
        const generatedWidget = Element.generateFromSave(element);
        generatedWidget.loadProperties();
        await elementContainer.addElement(generatedWidget);
    })
}

export default load;