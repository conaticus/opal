import TextBoxElement from "../CustomHtmlElements/OpalElements/TextBoxElement";
import { elements } from "../globals";
import { ElementSave } from "../types";
import toCamel from "../util/toCamel";
import toDashes from "../util/toDashes";
import { projectInfo } from "./load";

const apiTemplate = fsSync.readFileSync("./src/opalApiTemplate.js", "utf-8");

const save = async (): Promise<void> => {
    document.body.style.cursor = "progress";
    
    projectInfo.elements = [];

    let opalSrc = `
${apiTemplate}

export const elements = {
`

    elements.forEach(element => {
        const elementSave = <ElementSave>{ properties: {}, propertyTypes: {} };
        elementSave.propertyTypes = element.propertyTypes;

        for (const propertyKey in element.properties) {
            elementSave.type = element.constructor.name;
            elementSave.properties[propertyKey] = element.properties[propertyKey].value;
        }

        projectInfo.elements.push(elementSave);

        if (element.properties.identifier.value) {
            if (element instanceof TextBoxElement) {
                opalSrc += `${toCamel(element.properties.identifier.value)}: new TextBoxElement("${toDashes(element.properties.identifier.value)}"), `;
            }
        }
    })

    opalSrc += "};";

    await fs.writeFile(`${localStorage.getItem("currentProjectDirectory")}/project-info.json`, JSON.stringify(projectInfo));
    await fs.writeFile(`${localStorage.getItem("currentProjectDirectory")}/src/opal.js`, opalSrc);

    setTimeout(() => {
        document.body.style.cursor = "default";
    }, 100);
}

ipc.on("save", save);

export default save;