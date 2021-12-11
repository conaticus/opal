const camelToCapitalised = (camel: string): string => {
    return camel.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
}

export default camelToCapitalised;