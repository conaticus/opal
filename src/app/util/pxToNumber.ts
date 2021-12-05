const pxToNumber = (pxString: string): number => {
    return Number(pxString.substring(0, pxString.length - 2));
}

export default pxToNumber;