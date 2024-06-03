// Remover pontos e traço do CPF
export function formatCpf(cpf) {
    return cpf.replace(/[.-]/g, '');
}
