import { dialog, ipcMain } from "electron";

const attatchIpcListeners = (): void => {
    ipcMain.handle("request-dialog-choice", async (_, options) => {
        const dialogChoice = await dialog.showOpenDialog(options);
        return dialogChoice.filePaths[0];
    })
}

export default attatchIpcListeners;