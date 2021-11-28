"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
var createWindow = function () {
    var window = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true
    });
    window.loadFile("../../app/index.html");
};
electron_1.app.once("ready", function () {
    createWindow();
    electron_1.app.on("activate", function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
