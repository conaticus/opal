import { widgets } from "../globals";
import { SaveWidget } from "../types";
import { projectInfo } from "./load";

ipc.on("save", async () => {
    document.body.style.cursor = "progress";
    
    projectInfo.widgets = [];

    widgets.forEach(widget => {
        const widgetSave = <SaveWidget>{ properties: {}, propertyTypes: {} };
        widgetSave.propertyTypes = widget.propertyTypes;

        for (const propertyKey in widget.properties) {
            widgetSave.type = widget.constructor.name;
            widgetSave.properties[propertyKey] = widget.properties[propertyKey].value;
        }

        projectInfo.widgets.push(widgetSave);
    })

    await fs.writeFile(`${localStorage.getItem("currentProjectDirectory")}/project-info.json`, JSON.stringify(projectInfo));

    setTimeout(() => {
        document.body.style.cursor = "default";
    }, 50);
})