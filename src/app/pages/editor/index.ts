import createSidenav from "./scripts/sidenav";
import attatchEventListeners from "./scripts/attatchEventListeners";
import attachIpcListeners from "./scripts/attatchIpcListeners";
import load from "./scripts/load";
import { state } from "./util/state";

import "./scripts/save";
import "./scripts/build";
import OpalBody from "./CustomHtmlElements/OpalBody";

const loadEditor = async (): Promise<void> => {
    const opalBody = new OpalBody();
    await load(opalBody);

    createSidenav();

    attatchEventListeners();
    attachIpcListeners();

    ipc.invoke("editor-load", state.currentProjectDirectory);

    addEventListener("beforeunload", () => {
        ipc.invoke("editor-unload");
    });
};

loadEditor();
