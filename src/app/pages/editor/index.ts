import createSidenav from "./scripts/sidenav";;
import { createElementContainer } from "./scripts/preview";
import attatchEventListeners from "./scripts/attatchEventListeners";
import attachIpcListeners from "./scripts/attatchIpcListeners";
import load from "./scripts/load";
import { state } from "./util/state";

import "./scripts/save";
import "./scripts/build";

const loadEditor = async (): Promise<void> => {
    await load();

    createSidenav();
    createElementContainer();

    attatchEventListeners();
    attachIpcListeners();

    ipc.invoke("editor-load", state.currentProjectDirectory);

    addEventListener("beforeunload", () => {
        ipc.invoke("editor-unload");
    })
}

loadEditor();