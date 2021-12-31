import TextBoxElement from "../CustomHtmlElements/OpalElements/Text/TextboxElement";
import { ElementSave, ProjectInfo } from "../types";
import { state } from "../util/state";
import toCamel from "../util/toCamel";
import toDashes from "../util/toDashes";

const apiTemplate = fsSync.readFileSync("./src/opalApiTemplate.js", "utf-8");

const save = async (): Promise<void> => {
    document.body.style.cursor = "progress";
    
    // reset all elements so we can add them back
    state.projectInfo.elements = [];

    let opalSrc = `
${apiTemplate}

export const elements = {
`

    state.elements.forEach(element => {
        const elementSave = <ElementSave>{ properties: {}, propertyTypes: {} };
        elementSave.propertyTypes = element.propertyTypes;

        for (const propertyKey in element.properties) {
            elementSave.type = element.constructor.name;
            elementSave.properties[propertyKey] = element.properties[propertyKey].value;
        }

        state.projectInfo.elements.push(elementSave);

        if (element.properties.identifier.value) {
            if (element instanceof TextBoxElement) {
                opalSrc += `${toCamel(element.properties.identifier.value)}: new TextBoxElement("${toDashes(element.properties.identifier.value)}"), `;
            }
        }
    })

    opalSrc += "};";

    await fs.writeFile(`${state.currentProjectDirectory}/project-info.json`, JSON.stringify(state.projectInfo));
    await fs.writeFile(`${state.currentProjectDirectory}/src/opal.js`, opalSrc);

    setTimeout(() => {
        document.body.style.cursor = "default";
    }, 100);
}

ipc.on("save", save);

export default save;