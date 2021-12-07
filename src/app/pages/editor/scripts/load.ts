import { ProjectInfo } from "../types";

const load = async () => {
    const projectInfoRaw = await fs.readFile(`${localStorage.getItem("currentProjectDirectory")}/project-info.json`, "utf8");
    const projectInfo = <ProjectInfo>JSON.parse(projectInfoRaw);
    document.title = `Opal - ${projectInfo.name}`;
}

load();