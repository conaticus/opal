import { app, BrowserWindow } from "electron";

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
    });

    window.loadFile("../../app/index.html");
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