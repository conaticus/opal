import { WidgetProperty } from "../types";

const handleInspectorChange = (
    property: WidgetProperty<any>,
    ...data: any[]
) => {
    if (property.handleInspectorChange) property.handleInspectorChange(...data);
};

export default handleInspectorChange;
