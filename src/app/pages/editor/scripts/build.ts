import TextboxWidget from "../CustomHtmlElements/Widgets/Text/TextboxWidget";
import { TextType } from "../types";
import { state } from "../util/state";
import toDashes from "../util/toDashes";
import save from "./save";

const baseHTML =
    "<!DOCTYPE html><html lang='en'><html><head></script><script type='module' src='./src/index.js'></script></head><body><style>body { margin: 0; padding: 0; box-sizing: border-box; } h1 { font-weight: normal; margin: 0; } h2 { font-weight: normal; margin: 0; } h3 { font-weight: normal; margin: 0; } h4 { font-weight: normal; margin: 0; } h5 { font-weight: normal; margin: 0; } h6 { font-weight: normal; margin: 0; } p { font-weight: normal; margin: 0; } </style>";
let body = "";
const endingHTML = "</body></html>";

const appendTextElementSource = (widget: TextboxWidget): void => {
    let widgetType: string;
    switch (widget.properties.type.value.currentChoice) {
        case TextType.HEADING_ONE:
            widgetType = "h1";
            break;
        case TextType.HEADING_TWO:
            widgetType = "h2";
            break;
        case TextType.HEADING_THREE:
            widgetType = "h3";
            break;
        case TextType.HEADING_FOUR:
            widgetType = "h4";
            break;
        case TextType.HEADING_FIVE:
            widgetType = "h5";
            break;
        case TextType.HEADING_SIX:
            widgetType = "h6";
            break;
        case TextType.PARAGRAPH:
            widgetType = "p";
            break;
        default:
            return;
    }

    body += `<${widgetType} id="${toDashes(
        widget.properties.identifier.value
    )}" style=\"font-weight: ${String(
        widget.properties.weight.value.currentChoice
    )};${
        widget.properties.size.value
            ? `font-size: ${widget.properties.size.value}px;`
            : ""
    }\">${widget.properties.text.value}</${widgetType}>`;
};

const build = async (): Promise<void> => {
    await save();

    state.widgets.forEach((widget) => {
        if (widget instanceof TextboxWidget) appendTextElementSource(widget);
    });

    await fs.writeFile(
        `${state.currentProjectDirectory}/index.html`,
        baseHTML + body + endingHTML
    );
    body = "";
};

ipc.on("build", build);

export default build;
