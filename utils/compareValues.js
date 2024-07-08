export function compareValues(value1, value2) {
    // Verifica se os tipos são diferentes
    if (typeof value1 !== typeof value2) {
        // Tratar valores nulos e strings vazias como equivalentes
        if ((value1 === null || value1 === '') && (value2 === null || value2 === '')) {
            return true;
        }
        return false;
    }

    // Verifica se ambos os valores são arrays
    if (Array.isArray(value1) && Array.isArray(value2)) {
        return compareArrays(value1, value2);
    }

    // Verifica se ambos os valores são objetos não nulos
    if (typeof value1 === 'object' && value1 !== null && value2 !== null) {
        return compareObjects(value1, value2);
    }

    // Tratar valores nulos e strings vazias como equivalentes
    if ((value1 === null || value1 === '') && (value2 === null || value2 === '')) {
        return true;
    }

    // Comparação de valores primitivos (números, strings, etc.)
    return value1 === value2;
}

function compareArrays(array1, array2) {
    // Verifica se os arrays têm comprimentos diferentes
    if (array1.length !== array2.length) {
        return false;
    }

    // Compara cada elemento dos arrays
    for (let i = 0; i < array1.length; i++) {
        if (!compareValues(array1[i], array2[i])) {
            return false;
        }
    }

    return true;
}

function compareObjects(obj1, obj2) {
    // Obtém e ordena as chaves dos objetos
    const keys1 = Object.keys(obj1).sort();
    const keys2 = Object.keys(obj2).sort();

    // Verifica se os objetos têm números diferentes de chaves
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Compara cada valor das chaves dos objetos
    for (let i = 0; i < keys1.length; i++) {
        const key = keys1[i];
        if (!compareValues(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

