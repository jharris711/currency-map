export const addToOrRemoveFromArray = (objectToAdd, array) => {
    if (!array.find((x) => x === objectToAdd)) {
        array.push(objectToAdd)
        return array
    } else if (array.find((x) => x === objectToAdd)) {
        const filtered = array.filter((x) => x !== objectToAdd)
        array = filtered
        return array
    }
}