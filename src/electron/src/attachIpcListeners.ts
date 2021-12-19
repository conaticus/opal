import { dialog, ipcMain } from "electron";
import * as express from "express";
import { Server } from "http";

let openServer: Server;

const attatchIpcListeners = (): void => {
    ipcMain.handle("request-dialog-choice", async (_, options) => {
        const dialogChoice = await dialog.showOpenDialog(options);
        return dialogChoice.filePaths[0];
    })

    ipcMain.handle("editor-load", async (_, projectDirectory) => {
        const server = express();
        server.use(express.static(projectDirectory));
        openServer = server.listen(8080);
    })

    ipcMain.handle("editor-unload", () => {
        openServer.close();
    })
}

export default attatchIpcListeners;