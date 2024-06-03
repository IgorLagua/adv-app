// Remover pontos, traços e barras do CNPJ
export function formatCnpj(cnpj) {
    return cnpj.replace(/[\.\-\s\/]/g, '');
}
