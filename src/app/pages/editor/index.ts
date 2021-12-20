import createSidenav from "./scripts/sidenav";;
import { createElementContainer } from "./scripts/preview";
import attatchEventListeners from "./scripts/attatchEventListeners";
import attachIpcListeners from "./scripts/attatchIpcListeners";
import load from "./scripts/load";
import { getState, setState } from "./util/state";

import "./scripts/save";
import "./scripts/build";

const loadEditor = async (): Promise<void> => {
    await setState("elements", []);
    await load();

    createSidenav();
    createElementContainer();

    attatchEventListeners();
    attachIpcListeners();

    ipc.invoke("editor-load", await getState("currentProjectDirectory"));

    addEventListener("beforeunload", () => {
        ipc.invoke("editor-unload");
    })
}

loadEditor();