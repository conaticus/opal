import { OpenDialogOptions, ProjectInfo } from "../editor/types";

const form = document.getElementById("new-project-form");
const projectDirectoryInput = <HTMLInputElement>(
    document.getElementById("project-directory-input")
);

const projectDirDialogButton = <HTMLButtonElement>(
    document.getElementById("project-dir-dialog-button")
);
projectDirDialogButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const dialogChoice = await ipc.invoke("request-dialog-choice", {
        properties: ["openDirectory"],
    } as OpenDialogOptions);
    if (!dialogChoice) return;
    projectDirectoryInput.value = dialogChoice;
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const projectName = (
        document.getElementById("project-name-input") as HTMLInputElement
    ).value;
    const rootDir = projectDirectoryInput.value;

    try {
        await fs.access(rootDir);
    } catch {
        await fs.mkdir(rootDir);
    }

    if ((await fs.readdir(rootDir)).length !== 0) {
        alert("ERROR: Directory must be empty.");
        return;
    }

    const projectInfo = <ProjectInfo>{
        name: projectName,
        widgets: [],
        isOpal: true,
    };

    await fs.writeFile(
        `${rootDir}/project-info.json`,
        JSON.stringify(projectInfo)
    );
    await fs.chmod(`${rootDir}/project-info.json`, 444);

    await fs.mkdir(`${rootDir}/src`);
    await fs.writeFile(`${rootDir}/src/opal.js`, "export const widgets = {};");
    await fs.writeFile(`${rootDir}/src/index.js`, "");

    localStorage.setItem("currentProjectDirectory", rootDir);
    location.href = "../editor/index.html";
});
