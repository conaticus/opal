import TextWidget from "../CustomElements/Widgets/TextWidget";
import { widgets } from "../globals";
import { TextType } from "../types";
import save from "./save";

const baseHTML = "<!DOCTYPE html><html lang='en'><html><body><style>h1 { font-weight: normal; margin: 0; } h2 { font-weight: normal; margin: 0; } h3 { font-weight: normal; margin: 0; } h4 { font-weight: normal; margin: 0; } h5 { font-weight: normal; margin: 0; } h6 { font-weight: normal; margin: 0; } p { font-weight: normal; margin: 0; } </style>";
let body = "";
const endingHTML = "</body></html>";

const appendTextWidgetSource = (widget: TextWidget): void => {
    let elementType: string;
    switch (widget.properties.type.value.currentChoice) {
        case TextType.HEADING_ONE:
            elementType = "h1";
            break;
        case TextType.HEADING_TWO:
            elementType = "h2";
            break;
        case TextType.HEADING_THREE:
            elementType = "h3";
            break;
        case TextType.HEADING_FOUR:
            elementType = "h4";
            break;
        case TextType.HEADING_FIVE:
            elementType = "h5";
            break;
        case TextType.HEADING_SIX:
            elementType = "h6";
            break;
        case TextType.PARAGRAPH:
            elementType = "p";
            break;
        default: return;
    }

    body += `<${elementType} style=\"${widget.properties.size.value ? `font-size: ${widget.properties.size.value}px;` : ''}\">${widget.properties.text.value}</${elementType}>` 
}

const build = async (): Promise<void> => {
    save();
    widgets.forEach(widget => {
        if (widget instanceof TextWidget) appendTextWidgetSource(widget);
    })

    await fs.writeFile(`${localStorage.getItem("currentProjectDirectory")}/index.html`, baseHTML + body + endingHTML);
}

ipc.on("build", build);

export default build