import { app, BrowserWindow, Menu, nativeTheme } from "electron";
import menu from "./menu";
import { join as pathJoin } from "path";

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

nativeTheme.themeSource = "light";
Menu.setApplicationMenu(menu);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: pathJoin(__dirname, "./preload.js"),
        },
    });

    win.loadFile("../../app/pages/menu/index.html");
}

app.once("ready", () => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})