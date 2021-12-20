import { OpenDialogOptions, ProjectInfo } from "../editor/types";
import { setState } from "../editor/util/state";

const openProjectButton = document.getElementById("open-project-btn");

openProjectButton.addEventListener("click", async () => {
    const dialogChoice = await ipc.invoke("request-dialog-choice", { properties: ["openDirectory"] } as OpenDialogOptions);
    const projectInfoRaw = await fs.readFile(`${dialogChoice}/project-info.json`, "utf8");
    const projectInfo: ProjectInfo = JSON.parse(projectInfoRaw);

    if (projectInfo.isOpal) {
        await setState("currentProjectDirectory", dialogChoice);
        location.href = "../editor/index.html";
    } else {
        alert("ERROR: Project is not an Opal project.");
    }
})