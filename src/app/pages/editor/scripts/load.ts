import OpalBody from "../CustomHtmlElements/OpalBody";
import Widget from "../CustomHtmlElements/Widgets/Widget";
import { ProjectInfo } from "../types";
import { state } from "../util/state";

const load = async (opalBody: OpalBody): Promise<void> => {
    const projectInfoRaw = await fs.readFile(
        `${state.currentProjectDirectory}/project-info.json`,
        "utf8"
    );
    const projectInfo = <ProjectInfo>JSON.parse(projectInfoRaw);
    state.projectInfo = projectInfo;

    document.title = `Opal - ${projectInfo.name}`;

    state.projectInfo.widgets.forEach(async (widget) => {
        const generatedWidget = Widget.generateFromSave(widget);
        generatedWidget.loadProperties();
        await opalBody.addWidget(generatedWidget);
    });
};

export default load;
