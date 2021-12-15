import TextElement from "../CustomHtmlElements/OpalElements/TextBoxElement";
import { elements } from "../globals";
import { TextType } from "../types";
import save from "./save";

const baseHTML = "<!DOCTYPE html><html lang='en'><html><body><style>body { margin: 0; padding: 0; box-sizing: border-box; } h1 { font-weight: normal; margin: 0; } h2 { font-weight: normal; margin: 0; } h3 { font-weight: normal; margin: 0; } h4 { font-weight: normal; margin: 0; } h5 { font-weight: normal; margin: 0; } h6 { font-weight: normal; margin: 0; } p { font-weight: normal; margin: 0; } </style>";
let body = "";
const endingHTML = "</body></html>";

const appendTextElementSource = (element: TextElement): void => {
    let elementType: string;
    switch (element.properties.type.value.currentChoice) {
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

    body += `<${elementType} style=\"font-weight: ${String(element.properties.weight.value.currentChoice)};${element.properties.size.value ? `font-size: ${element.properties.size.value}px;` : ''}\">${element.properties.text.value}</${elementType}>` 
}

const build = async (): Promise<void> => {
    save();
    elements.forEach(element => {
        if (element instanceof TextElement) appendTextElementSource(element);
    })

    await fs.writeFile(`${localStorage.getItem("currentProjectDirectory")}/index.html`, baseHTML + body + endingHTML);
    body = "";
}

ipc.on("build", build);

export default build;