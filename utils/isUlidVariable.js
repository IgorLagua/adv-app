// Função para verificar se uma string é um ULID
export function isUlidVariable(value) {
    const ulidRegex = /^[0-9a-zA-HJKMNP-TV-Z]{26}$/i;
    return typeof value === "string" && ulidRegex.test(value);
}
