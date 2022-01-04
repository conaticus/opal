import ContainerElement from "../CustomHtmlElements/OpalElements/Layout/ContainerElement";
import OpalElement from "../CustomHtmlElements/OpalElements/OpalElement";
import { ProjectInfo } from "../types";

interface State {
    currentProjectDirectory: string;
    elements: OpalElement[];
    projectInfo: ProjectInfo;
    freeContainer: ContainerElement;
}

export const state: State = {
    currentProjectDirectory: localStorage.getItem("currentProjectDirectory"),
    elements: [],
    projectInfo: { name: "Unkown", elements: []  },
    freeContainer: null,
}