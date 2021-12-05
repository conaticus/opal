import "./scripts/sidebar";
import "./scripts/preview";
import "./scripts/save";

ipc.on("open-menu", () => {
    location.href = "../menu/index.html";
})