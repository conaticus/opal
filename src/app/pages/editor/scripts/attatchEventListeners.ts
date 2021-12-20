const attatchEventListeners = (): void => {
    history.pushState(null, null, document.title);
    addEventListener("popstate", () => {
        history.pushState(null, null, document.title);
    })
}

export default attatchEventListeners;