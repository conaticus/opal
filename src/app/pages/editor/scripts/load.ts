import OpalElement from "../CustomHtmlElements/OpalElements/OpalElement";
import { ProjectInfo } from "../types";
import { state } from "../util/state";

const load = async (): Promise<void> => {
    const projectInfoRaw = await fs.readFile(`${state.currentProjectDirectory}/project-info.json`, "utf8");
    const projectInfo = <ProjectInfo>JSON.parse(projectInfoRaw);
    state.projectInfo = projectInfo;

    document.title = `Opal - ${projectInfo.name}`;

    state.projectInfo.elements.forEach(async (element) => {
        const generatedWidget = OpalElement.generateFromSave(element);
        generatedWidget.loadProperties();
        await state.freeContainer.addElement(generatedWidget);
    })
}

export default load;