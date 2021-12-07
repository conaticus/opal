ipc.on("open-menu", () => {
    location.href = "../menu/index.html";
})

ipc.on("new-project", () => {
    location.href = "../new-project/index.html";
})

ipc.on("preview-site", () => {
    const url = `${localStorage.getItem("currentProjectDirectory")}/index.html`;
    shell.openExternal(url);
})