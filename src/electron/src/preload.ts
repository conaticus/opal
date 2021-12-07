import { contextBridge, ipcRenderer } from "electron";
import * as fs from "fs/promises";

contextBridge.exposeInMainWorld("ipc", { on: ipcRenderer.on.bind(ipcRenderer), invoke: ipcRenderer.invoke } );
contextBridge.exposeInMainWorld("fs", fs);