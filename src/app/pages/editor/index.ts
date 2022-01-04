import createSidenav from "./scripts/sidenav";;
import attatchEventListeners from "./scripts/attatchEventListeners";
import attachIpcListeners from "./scripts/attatchIpcListeners";
import load from "./scripts/load";
import { state } from "./util/state";

import "./scripts/save";
import "./scripts/build";
import appendCustomHtmlElement from "./util/appendCustomHtmlElement";
import ContainerElement, { elementContainers } from "./CustomHtmlElements/OpalElements/Layout/ContainerElement";

const loadEditor = async (): Promise<void> => {
    state.freeContainer = new ContainerElement();
    appendCustomHtmlElement(elementContainers, state.freeContainer);
    await load();

    createSidenav();

    attatchEventListeners();
    attachIpcListeners();

    ipc.invoke("editor-load", state.currentProjectDirectory);

    addEventListener("beforeunload", () => {
        ipc.invoke("editor-unload");
    })
}

loadEditor();