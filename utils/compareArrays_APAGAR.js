export function compareArrays(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }

    function hashObject(obj) {
        // Cria uma string única baseada nos valores do objeto
        return JSON.stringify(obj, Object.keys(obj).sort());
    }

    function createFrequencyMap(array) {
        const freqMap = {};
        array.forEach((item) => {
            const hash = hashObject(item);
            freqMap[hash] = (freqMap[hash] || 0) + 1;
        });
        return freqMap;
    }

    const freqMap = createFrequencyMap(array1);

    for (const item of array2) {
        const hash = hashObject(item);
        if (!freqMap[hash]) {
            return false;
        }
        freqMap[hash] -= 1;
    }

    return true;
}