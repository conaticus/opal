const toDashes = (text: string): string => {
    return text.split(" ").join("-").toLowerCase();
}

export default toDashes;