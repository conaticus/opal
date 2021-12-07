import { contextBridge, ipcRenderer } from "electron";
import * as fs from "fs/promises";
import { shell } from "electron"

contextBridge.exposeInMainWorld("ipc", { on: ipcRenderer.on.bind(ipcRenderer), invoke: ipcRenderer.invoke } );
contextBridge.exposeInMainWorld("fs", fs);
contextBridge.exposeInMainWorld("shell", { openExternal: shell.openExternal });