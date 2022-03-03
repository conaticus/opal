import Widget from "../CustomHtmlElements/Widgets/Widget";
import { ProjectInfo } from "../types";

interface State {
    currentProjectDirectory: string;
    widgets: Widget[];
    projectInfo: ProjectInfo;
}

export const state: State = {
    currentProjectDirectory: localStorage.getItem("currentProjectDirectory"),
    widgets: [],
    projectInfo: { name: "Unknown", widgets: [] },
};
