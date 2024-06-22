export function removeEmptyObjects(arr) {
    return arr.filter(obj => {
        return !Object.values(obj).every(value => value === null || value === '');
    });
}