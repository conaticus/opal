import { BrowserWindow, ipcMain, Menu, MenuItemConstructorOptions } from "electron";

const menuTemplate: MenuItemConstructorOptions[] = [
    {
        label: "File",
        submenu: [
            {
                label: "New",
                accelerator: "Ctrl+N"
            },
            {
                label: "Save",
                accelerator: "Ctrl+S",
                click: () => {
                    BrowserWindow.getFocusedWindow().webContents.send("save");
                }
            },
        ]
    },
    {
        label: "Project",
        submenu: [
            {
                label: "Build",
                accelerator: "Ctrl+B"
            },
            {
                label: "Open",
                accelerator: "Ctrl+O"
            },
            {
                label: "Open Project Directory"
            },
            {
                label: "Preview Site",
                accelerator: "Ctrl+P"
            },
            {
                label: "Settings",
                accelerator: "Shift+,"
            },
        ]
    },
    {
        label: "Developer",
        submenu: [
            {
                label: "Inspect Element",
                role: "toggleDevTools"
            },
            {
                label: "Reload",
                role: "reload"
            }
        ]
    },
    {
        label: "Opal",
        submenu: [
            {
                label: "Menu",
                click: () => {
                    BrowserWindow.getFocusedWindow().webContents.send("open-menu");
                }
            },
            {
                label: "Settings",
                accelerator: "Ctrl+,"
            },
            {
                label: "Exit",
                role: "close"
            }
        ]
    },
]

const menu = Menu.buildFromTemplate(menuTemplate);

export default menu;