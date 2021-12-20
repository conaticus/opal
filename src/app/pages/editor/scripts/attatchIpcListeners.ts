import { getState } from "../util/state";

const attatchIpcListeners = (): void => {
    ipc.on("open-menu", () => {
        location.href = "../menu/index.html";
    })

    ipc.on("new-project", () => {
        location.href = "../new-project/index.html";
    })

    ipc.on("preview-site", () => {
        shell.openExternal("http://localhost:8080");
    })

    ipc.on("open-project-directory", async () => {
        shell.showItemInFolder(await getState("currentProjectDirectory"));
    })
}

export default attatchIpcListeners;