import { app, BrowserWindow, globalShortcut, ipcMain, Menu, nativeTheme } from "electron";
import menu from "./menu";
import * as path from "path";
import attatchIpcListeners from "./attachIpcListeners";

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

nativeTheme.themeSource = "light";
Menu.setApplicationMenu(menu);

const createWindow = (): void => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        fullscreen: true,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, "./preload.js"),
        },
    });

    win.loadFile("../../app/pages/menu/index.html");
    attatchIpcListeners();
}

app.once("ready", () => {
    createWindow();

    globalShortcut.unregister("CommandOrControl+R");

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})