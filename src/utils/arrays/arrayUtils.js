function replaceInArray(
    originalArray,
    index,
    newItem
) {
    const newArray = [...originalArray];

    newArray.splice(index, 1, newItem);

    return newArray;
}

export { replaceInArray };