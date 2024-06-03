export default () => {
	// https://www.youtube.com/watch?v=cV2nrTthPlk
	// 1:30:00

	// const passwordValidation = [
	//     value => !!value || 'A Senha é obrigatório.',
	//     value => (value.length < 1 || value.length > 4) || 'A Senha deve ter mais de 4 caracteres.',
	//     value => value.length <= 15 || 'A Senha deve ter menos de 15 caracteres.',
	//     value => !!(value || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
	//       'A senha deve conter uma letra maiúscula, um caractere numérico e um caractere especial',
	// ]

	// const emailValidation = [
	//     value => !!value || 'O E-mail é obrigatório.',
	//     value => {
	//         const padrao = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	//         return padrao.test(value) || 'O e-mail não é valido'
	//     },
	// ]

	// const nameValidation = [
	//     value => !!value || 'O Nome é obrigatório.',
	//     value => (value.length < 1 || value.length > 3) || 'O Nome deve ter mais de 3 caracteres.',
	//     value => value.length <= 70 || 'O Nome deve ter menos de 70 caracteres.',
	// ]

	// const zipCodeValidation = [
	//     value => value === '' ? true : (value.length < 1 || value.length > 8) || 'O CEP deve ter mais de 9 caracteres.',
	// ]

	// const cpfValidation = [
	//     value => value === '' ? true : (value.length < 1 || value.length > 13) || 'A CPF deve ter de 14 caracteres.',
	//     value => value === '' ? true : value.length <= 14 || 'O CPF deve ter menos de 15 caracteres.',
	// ]

	// Função de validação principal que aceita o item de contexto (informação do campo) e o valor de entrada
	const cpfValidation = iten => value => {

		// Verificar se o valor foi fornecido
		if (!value) return false;

		// Remove caracteres não numéricos do valor de entrada (CPF pode ser inserido com pontos e traços)
		const cpf = value.replace(/[^\d]/g, "");

		// Verificar se o CPF tem exatamente 11 dígitos e se não é uma das sequências inválidas conhecidas
		if (cpf.length !== 11 || knownInvalidCpfs.includes(cpf)) {
			return `${iten.name} não é válido.`;  // Se não, retorne uma mensagem de erro
		}

		// Verifica os dígitos de verificação do CPF usando a função checkDigit
		if (!checkDigit(cpf, 9, 10) || !checkDigit(cpf, 10, 11)) {
			return `${iten.name} não é válido.`;  // Se algum dígito de verificação estiver errado, retorne uma mensagem de erro
		}

		return true;  // Se tudo estiver ok, retorne verdadeiro
	};

	// Função para verificar um único dígito de verificação do CPF
	function checkDigit(cpf, end, position) {
		let sum = 0;  // Inicializar a soma usada no cálculo do dígito
		let remainder;  // Inicializar o resto da divisão

		// Loop que calcula a soma necessária para o dígito de verificação
		for (let i = 1; i <= end; i++) {
			sum += parseInt(cpf.substring(i - 1, i)) * (position + 1 - i);
		}

		// Calcula o resto da divisão da soma por 11, multiplicada por 10
		remainder = (sum * 10) % 11;

		// Se o resto for 10 ou 11, considere-o como 0
		if (remainder === 10 || remainder === 11) remainder = 0;

		// Verifique se o resto calculado corresponde ao dígito de verificação atual do CPF
		return remainder === parseInt(cpf.substring(end, end + 1));
	}


	const cnpjValidation = item => value => {

		if (!value) return false;

		const cnpj = value.replace(/[^\d]/g, "");

		// CNPJ deve ter exatamente 14 dígitos e não pode ser uma sequência inválida conhecida
		if (cnpj.length !== 14 || knownInvalidCnpjs.includes(cnpj)) {
			return `${item.name} não é válido.`;
		}

		// Valida os dígitos verificadores do CNPJ
		if (!checkDigitCNPJ(cnpj, 12, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) ||
			!checkDigitCNPJ(cnpj, 13, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])) {
			return `${item.name} não é válido.`;
		}

		return true;
	};

	function checkDigitCNPJ(cnpj, end, weights) {
		let sum = 0;
		for (let i = 0; i < weights.length; i++) {
			sum += parseInt(cnpj.charAt(end - weights.length + i)) * weights[i];
		}

		const remainder = sum % 11;
		if (remainder < 2) return 0 === parseInt(cnpj.charAt(end));
		else return (11 - remainder) === parseInt(cnpj.charAt(end));
	}




	// const cpfCnpjValidation = [
	//     value => !!value || 'O CPF ou CNPJ é obrigatório.',
	//     value => value === '' ? true : (value.length < 1 || value.length > 13) || 'O CPF deve ter de 14 caracteres.',
	//     value => value === '' ? true : (value.length < 15 || value.length > 17) || 'O CNPJ deve ter de 18 caracteres.',
	//     value => value === '' ? true : value.length <= 18 || 'O CNPJ deve ter menos de 15 caracteres.',
	// ]

	const cellPhoneValidation = [
		value => !!value || 'O Celular é obrigatório.',
		value => value === '' ? true : (value.length < 1 || value.length > 14) || 'O Telefone deve ter de 11 caracteres.',
		value => value === '' ? true : value.length <= 15 || 'O Telefone deve ter menos de 12 caracteres.',
	]

	// const descriptionValidation = [
	//     value => value === '' ? true : (value?.length < 1 || value?.length > 3) || 'A Descrição deve ter mais de 3 caracteres.',
	//     value => value?.length <= 200 || 'A Descrição deve ter menos de 200 caracteres.',
	// ]

	// const brandValidation = [
	//     value => !!value || 'A Marca é obrigatório.',
	// ]

	// const categoryValidation = [
	//     value => !!value || 'A Categoria é obrigatório.',
	// ]

	// const modelValidation = [
	//     value => !!value || 'O Modelo é obrigatório.',
	// ]

	const requiredValidation = iten => value => !!value ||
		`${iten.name} é obrigatório.`

	// const equalLengthValidation = iten => value => (value || '').length === iten.number || 
	//     `${iten.name} deve ter ${iten.number} caracteres.`

	const equalLengthValidation = iten => value => {
		// Se o valor for nulo ou vazio, retorna true
		if (!value || value.trim() === '') return true;
		// Se o valor não for vazio, realiza a validação de comprimento igual
		return (value || '').length === iten.number ||
			`${iten.name} deve ter ${iten.number} caracteres.`;
	}


	// const minLengthValidation = iten => value => (value || '').length > iten.number || 
	//     `${iten.name} deve ter mais de ${iten.number} caracteres.`

	const minLengthValidation = iten => value => {
		// Se o valor for nulo ou vazio, retorna true
		if (!value || value.trim() === '') return true;
		// Se o valor não for vazio, realiza a validação de comprimento mínimo
		return (value || '').length >= iten.number ||
			`${iten.name} deve ter mais de ${iten.number} caracteres.`;
	}


	// const maxLengthValidation = iten => value => value?.length <= iten.number || 
	//     `${iten.name} deve ter menos de ${iten.number} caracteres.`

	const maxLengthValidation = iten => value => {
		// Se o valor for nulo ou vazio, retorna true
		if (!value || value.trim() === '') return true;
		// Se o valor não for vazio, realiza a validação de comprimento máximo
		return value.length <= iten.number ||
			`${iten.name} deve ter menos de ${iten.number} caracteres.`;
	}

	// const betweenLengthValidation = iten => value => value === '' ? true : (value?.length < iten.start || value?.length > iten.end) || 
	//     `${iten.name} deve ter mais de ${iten.end} caracteres.`

	const betweenLengthValidation = iten => value => {
		// Se o valor for nulo ou vazio, retorna true
		if (!value || value.trim() === '') return true;
		// Se o valor não for vazio, realiza a validação de comprimento entre iten.start e iten.end
		return (value.length >= iten.start && value.length <= iten.end) ||
			`${iten.name} deve ter entre ${iten.start} e ${iten.end} caracteres.`;
	}

	// const emailValidation = iten => value => {
	//     const padrao = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	//     return padrao.test(value) || `${iten.name} não é valido`
	// }

	const emailValidation = iten => value => {
		// Se o valor for nulo ou vazio, retorna true
		if (!value || value.trim() === '') return true;
		// Define o padrão para validação de e-mail
		const padrao = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		// Se o valor não for vazio, realiza a validação de e-mail
		return padrao.test(value) || `${iten.name} não é válido`;
	}


	const passwordValidation = iten => value =>
		!!(value || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
		`${iten.name} deve conter uma letra maiúscula, um caractere numérico e um caractere especial`


	return {
		passwordValidation,
		// emailValidation,
		// zipCodeValidation,
		// nameValidation,
		cpfValidation,
		cnpjValidation,
		// cpfCnpjValidation,
		cellPhoneValidation,
		// descriptionValidation,
		// brandValidation,
		// categoryValidation,
		// modelValidation,

		requiredValidation,
		emailValidation,
		equalLengthValidation,
		minLengthValidation,
		maxLengthValidation,
		betweenLengthValidation,
	}
}

const knownInvalidCpfs = [
	"00000000000",
	"11111111111",
	"22222222222",
	"33333333333",
	"44444444444",
	"55555555555",
	"66666666666",
	"77777777777",
	"88888888888",
	"99999999999"
];

const knownInvalidCnpjs = [
	"00000000000000",
	"11111111111111",
	"22222222222222",
	"33333333333333",
	"44444444444444",
	"55555555555555",
	"66666666666666",
	"77777777777777",
	"88888888888888",
	"99999999999999"
];