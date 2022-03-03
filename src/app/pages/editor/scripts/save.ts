import TextBoxWidget from "../CustomHtmlElements/Widgets/Text/TextboxWidget";
import { WidgetSave } from "../types";
import { state } from "../util/state";
import toCamel from "../util/toCamel";
import toDashes from "../util/toDashes";

const apiTemplate = fsSync.readFileSync("./src/opalApiTemplate.js", "utf-8");

const save = async (): Promise<void> => {
    document.body.style.cursor = "progress";

    // reset all elements so we can add them back
    state.projectInfo.widgets = [];

    let opalSrc = `
${apiTemplate}

export const widgets = {
`;

    state.widgets.forEach((widget) => {
        const widgetSave = <WidgetSave>{ properties: {}, propertyTypes: {} };
        widgetSave.propertyTypes = widget.propertyTypes;

        for (const propertyKey in widget.properties) {
            widgetSave.type = widget.constructor.name;
            widgetSave.properties[propertyKey] =
                widget.properties[propertyKey].value;
        }

        state.projectInfo.widgets.push(widgetSave);

        if (widget.properties.identifier.value) {
            if (widget instanceof TextBoxWidget) {
                opalSrc += `${toCamel(
                    widget.properties.identifier.value
                )}: new TextBoxWidget("${toDashes(
                    widget.properties.identifier.value
                )}"), `;
            }
        }
    });

    opalSrc += "};";

    await fs.writeFile(
        `${state.currentProjectDirectory}/project-info.json`,
        JSON.stringify(state.projectInfo)
    );
    await fs.writeFile(`${state.currentProjectDirectory}/src/opal.js`, opalSrc);

    setTimeout(() => {
        document.body.style.cursor = "default";
    }, 100);
};

ipc.on("save", save);

export default save;
