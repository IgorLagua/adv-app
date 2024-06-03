// Remover traço do CEP
export function formatCep(cep) {
    return cep.replace(/\D/g, '');
}