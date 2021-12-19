import { dialog, ipcMain } from "electron";
import * as express from "express";

const attatchIpcListeners = (): void => {
    ipcMain.handle("request-dialog-choice", async (_, options) => {
        const dialogChoice = await dialog.showOpenDialog(options);
        return dialogChoice.filePaths[0];
    })

    ipcMain.handle("editor-load", async (_, projectDirectory) => {
        const server = express();
        server.use(express.static(projectDirectory));
        server.listen(8080);
    })
}

export default attatchIpcListeners;