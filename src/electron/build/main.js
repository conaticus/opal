"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var menu_1 = require("./menu");
var path_1 = require("path");
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
electron_1.nativeTheme.themeSource = "light";
electron_1.Menu.setApplicationMenu(menu_1["default"]);
var createWindow = function () {
    var win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: (0, path_1.join)(__dirname, "./preload.js")
        }
    });
    win.loadFile("../../app/pages/menu/index.html");
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
