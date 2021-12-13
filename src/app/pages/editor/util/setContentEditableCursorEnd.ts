const setContentEditableCursorEnd = (element: HTMLElement) => {
    const selection = getSelection();
    const range = document.createRange();

    selection.removeAllRanges();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.addRange(range);
    element.focus();
}

export default setContentEditableCursorEnd;