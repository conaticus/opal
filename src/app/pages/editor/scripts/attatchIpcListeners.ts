import { state } from "../util/state";
import build from "./build";

const attatchIpcListeners = (): void => {
    ipc.on("open-menu", () => {
        location.href = "../menu/index.html";
    })

    ipc.on("new-project", () => {
        location.href = "../new-project/index.html";
    })

    ipc.on("preview-site", async () => {
        await build();
        shell.openExternal("http://localhost:8080");
    })

    ipc.on("open-project-directory", async () => {
        shell.showItemInFolder(state.currentProjectDirectory);
    })
}

export default attatchIpcListeners;