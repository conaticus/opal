import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipc", { on: ipcRenderer.on.bind(ipcRenderer) } );