import "./scripts/sidenav";
import "./scripts/preview";
import "./scripts/save";
import "./scripts/build";
import "./scripts/ipcListeners";
import "./scripts/attatchEventListeners";
import "./scripts/inspector";

// Important this is imported last
import "./scripts/load";

ipc.invoke("editor-load", localStorage.getItem("currentProjectDirectory"));