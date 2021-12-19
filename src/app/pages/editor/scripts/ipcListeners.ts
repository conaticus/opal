ipc.on("open-menu", () => {
    location.href = "../menu/index.html";
})

ipc.on("new-project", () => {
    location.href = "../new-project/index.html";
})

ipc.on("preview-site", () => {
    shell.openExternal("http://localhost:8080");
})

ipc.on("open-project-directory", () => {
    shell.showItemInFolder(localStorage.getItem("currentProjectDirectory"));
})