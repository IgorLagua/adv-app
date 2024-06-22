
const {
	requiredValidation,
	equalLengthValidation,
	minLengthValidation,
	maxLengthValidation,
	emailValidation,
	cpfValidation,
} = useValidation();

const { cpfMask } = useMask();
const { brazilianStates, nationalities } = utilsComposable();


export function customerFieldsRequired() {

	return [

		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "Nome completo",
			errorMensages: null,
			rules: [
				requiredValidation({ name: "O nome completo" }),
				minLengthValidation({ name: "O nome completo", number: 2 }),
				maxLengthValidation({ name: "O nome completo", number: 70 }),
			],
			key: "name",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "autocomplete",
			label: "Nacionalidade",
			errorMensages: null,
			rules: [requiredValidation({ name: "A nacionalidade" })],
			items: nationalities,
			key: "nationality",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "Profissão",
			errorMensages: null,
			rules: [
				requiredValidation({ name: "A profissão" }),
				minLengthValidation({ name: "A profissão", number: 2 }),
				maxLengthValidation({ name: "A profissão", number: 30 }),
			],
			key: "profession",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "select",
			label: "Estado Civil",
			errorMensages: null,
			rules: [requiredValidation({ name: "O estado civil" })],
			items: [
				"Solteira",
				"Solteiro",
				"Casada",
				"Casado",
				"Separada",
				"Separado",
				"Divorciada",
				"Divorciado",
				"Viúva",
				"Viúvo",
			],
			key: "maritalStatus",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "CPF",
			errorMensages: null,
			rules: [
				requiredValidation({ name: "O CPF" }),
				equalLengthValidation({ name: "O CPF", number: 14 }),
				cpfValidation ({name: 'O CPF'}),
			],
			key: "cpf",
			mask: cpfMask,
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "RG",
			errorMensages: null,
			rules: [
				requiredValidation({ name: "O RG" }),
				minLengthValidation({ name: "O RG", number: 7 }),
				maxLengthValidation({ name: "O RG", number: 12 }),
			],
			key: "rg",
		},

	];

}

export function customerFieldsOptional() {

	return [

		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "Nome social",
			errorMensages: null,
			rules: [
				minLengthValidation({ name: "O nome social", number: 2 }),
				maxLengthValidation({ name: "O nome social", number: 10 }),
			],
			key: "socialName",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "select",
			label: "Gênero",
			errorMensages: null,
			items: ["Masculino", "Feminino" /* , "Outro" */],
			key: "gender",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "select",
			label: "Pessoa politicamente exposta ",
			errorMensages: null,
			items: [
				{ name: 'Não', value: false },
				{ name: 'Sim', value: true }
			],
			key: "politicalPerson",
		},
		{
			cols: 12,
			sm: 6,
			md: 2,
			type: "text",
			label: "Naturalidade",
			errorMensages: null,
			rules: [
				minLengthValidation({ name: "A naturalidade", number: 2 }),
				maxLengthValidation({ name: "A naturalidade", number: 15 }),
			],
			key: "naturalness",
		},
		{
			cols: 12,
			sm: 6,
			md: 2,
			type: "select",
			label: "Estado",
			errorMensages: null,
			items: brazilianStates,
			key: "naturalnessState",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "Nome mãe",
			errorMensages: null,
			rules: [
				minLengthValidation({ name: "O nome mãe", number: 2 }),
				maxLengthValidation({ name: "O nome mãe", number: 70 }),
			],
			key: "motherName",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "Nome pai",
			errorMensages: null,
			rules: [
				minLengthValidation({ name: "O nome pai", number: 2 }),
				maxLengthValidation({ name: "O nome pai", number: 70 }),
			],
			key: "fatherName",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "E-mail",
			errorMensages: null,
			rules: [emailValidation({ name: "O e-mail" })],
			key: "email",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "CNH",
			errorMensages: null,
			rules: [
				minLengthValidation({ name: "A CNH", number: 9 }),
				maxLengthValidation({ name: "A CNH", number: 10 }),
			],
			key: "cnh",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "date",
			label: "Expedição do CNH",
			errorMensages: null,
			rules: [],
			key: "cnhDate",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "date",
			label: "Expedição do RG",
			errorMensages: null,
			rules: [],
			key: "rgDate",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "PIS",
			errorMensages: null,
			rules: [
				minLengthValidation({ name: "O número do PIS", number: 5 }),
				maxLengthValidation({ name: "O número do PIS", number: 10 }),
			],
			key: "pis",
		},
		// {
		// 	cols: 12,
		// 	sm: 6,
		// 	md: 4,
		// 	type: "text",
		// 	label: "n° entidade classe",
		// 	errorMensages: null,
		// 	rules: [
		// 		minLengthValidation({
		// 			name: "O número da entidade classe",
		// 			number: 5,
		// 		}),
		// 		maxLengthValidation({
		// 			name: "O número da entidade classe",
		// 			number: 10,
		// 		}),
		// 	],
		// 	key: "classEntityNumber",
		// },
		// {
		// 	cols: 12,
		// 	sm: 6,
		// 	md: 4,
		// 	type: "text",
		// 	label: "Tipo entidade",
		// 	errorMensages: null,
		// 	rules: [
		// 		minLengthValidation({ name: "O tipo entidade", number: 2 }),
		// 		maxLengthValidation({ name: "O tipo entidade", number: 10 }),
		// 	],
		// 	key: "classEntityType",
		// },
		// {
		// 	cols: 12,
		// 	sm: 6,
		// 	md: 4,
		// 	type: "select",
		// 	label: "Estado entidade",
		// 	errorMensages: null,
		// 	rules: [],
		// 	items: brazilianStates,
		// 	key: "classEntityState",
		// },
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "n° passaporte",
			rules: [
				minLengthValidation({ name: "O n° passaporte", number: 8 }),
				maxLengthValidation({ name: "O n° passaporte", number: 12 }),
			],
			key: "passportNumber",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "RNE (estrangeiros)",
			errorMensages: null,
			rules: [
				minLengthValidation({ name: "O RNE (estrangeiros)", number: 10 }),
				maxLengthValidation({ name: "O RNE (estrangeiros)", number: 20 }),
			],
			key: "rneNumber",
		},

	];
}

export function customerClassEntitiesFieldsOptional() {

	return [

		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "n° entidade classe",
			errorMensages: null,
			rules: [
				minLengthValidation({
					name: "O número da entidade classe",
					number: 5,
				}),
				maxLengthValidation({
					name: "O número da entidade classe",
					number: 10,
				}),
			],
			key: "number",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "Tipo entidade",
			errorMensages: null,
			rules: [
				minLengthValidation({ name: "O tipo entidade", number: 2 }),
				maxLengthValidation({ name: "O tipo entidade", number: 10 }),
			],
			key: "type",
		},
		{
			cols: 12,
			sm: 6,
			md: 2,
			type: "select",
			label: "Estado entidade",
			errorMensages: null,
			rules: [],
			items: brazilianStates,
			key: "state",
		},
		

	];
}
