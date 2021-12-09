import { BrowserWindow, Menu, MenuItemConstructorOptions } from "electron";

const focusedWindowSend = (channel: string) => {
    BrowserWindow.getFocusedWindow().webContents.send(channel);
}

const menuTemplate: MenuItemConstructorOptions[] = [
    {
        label: "Project",
        submenu: [
            {
                label: "New",
                accelerator: "Ctrl+N",
                click: () => {
                    focusedWindowSend("new-project");
                }
            },
            {
                label: "Save",
                accelerator: "Ctrl+S",
                click: () => {
                    focusedWindowSend("save");
                }
            },
            {
                label: "Build",
                accelerator: "Ctrl+B",
                click: () => {
                    focusedWindowSend("build");
                }
            },
            {
                label: "Open",
                accelerator: "Ctrl+O"
            },
            {
                label: "Open Project Directory",
                click: () => {
                    focusedWindowSend("open-project-directory");
                }
            },
            {
                label: "Preview Site",
                accelerator: "Ctrl+P",
                click: () => {
                    focusedWindowSend("preview-site");
                }
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
                    focusedWindowSend("open-menu");
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