import Element from "../CustomHtmlElements/OpalElements/Element"
import { getState, setState } from "./state"

const getElements = async (): Promise<Element[]> => {
    return await getState("elements");
}

const addElementToState = async (element: Element): Promise<void> => {
    await setState("elements", (await getElements()).push(element));
}

export { getElements, addElementToState };