import { ElementProperty } from "../types";

const handleInspectorChange = (property: ElementProperty<any>, ...data: any[]) => {
    if (property.handleInspectorChange)
        property.handleInspectorChange(...data);
}

export default handleInspectorChange;