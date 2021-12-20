export const setState = async (property: string, value: any): Promise<void> => {
    await ipc.invoke("set-state", { property, value });
}

export const getState = async (property: string): Promise<any> => {
    return await ipc.invoke("get-state", property);
}