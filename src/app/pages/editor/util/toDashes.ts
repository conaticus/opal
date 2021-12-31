const toDashes = (text: string): string => {
    if (typeof text !== "string") return "";
    return text.split(" ").join("-").toLowerCase();
}

export default toDashes;