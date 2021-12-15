import { elements } from "../globals";
import { ElementSave } from "../types";
import { projectInfo } from "./load";

const save = async (): Promise<void> => {
    document.body.style.cursor = "progress";
    
    projectInfo.elements = [];

    elements.forEach(element => {
        const elementSave = <ElementSave>{ properties: {}, propertyTypes: {} };
        elementSave.propertyTypes = element.propertyTypes;

        for (const propertyKey in element.properties) {
            elementSave.type = element.constructor.name;
            elementSave.properties[propertyKey] = element.properties[propertyKey].value;
        }

        projectInfo.elements.push(elementSave);
    })

    await fs.writeFile(`${localStorage.getItem("currentProjectDirectory")}/project-info.json`, JSON.stringify(projectInfo));

    setTimeout(() => {
        document.body.style.cursor = "default";
    }, 100);
}

ipc.on("save", save);

export default save;