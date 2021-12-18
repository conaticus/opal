import { contextBridge, ipcRenderer } from "electron";
import * as fs from "fs/promises";
import * as fsSync from "fs";
import { shell } from "electron"

contextBridge.exposeInMainWorld("ipc", { on: ipcRenderer.on.bind(ipcRenderer), invoke: ipcRenderer.invoke } );
contextBridge.exposeInMainWorld("fs", fs);
contextBridge.exposeInMainWorld("fsSync", fsSync);
contextBridge.exposeInMainWorld("shell", { openExternal: shell.openExternal, showItemInFolder: shell.showItemInFolder, });