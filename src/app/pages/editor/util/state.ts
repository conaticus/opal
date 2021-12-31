import Element from "../CustomHtmlElements/OpalElements/Element";
import { ProjectInfo } from "../types";

interface State {
    currentProjectDirectory: string;
    elements: Element[];
    projectInfo: ProjectInfo;
}

export const state: State = {
    currentProjectDirectory: localStorage.getItem("currentProjectDirectory"),
    elements: [],
    projectInfo: { name: "Unkown", elements: []  },
}