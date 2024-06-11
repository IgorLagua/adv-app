
const {
	requiredValidation,
	equalLengthValidation,
	minLengthValidation,
	maxLengthValidation,
	emailValidation,
	cnpjValidation,
} = useValidation();

const { cnpjMask } = useMask();

export function companyFieldsRequired() {

	return [

		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "template",
			label: "CNPJ",
			errorMensages: null,
			rules: [
				requiredValidation({ name: "O CNPJ" }),
				equalLengthValidation({ name: "O CNPJ", number: 18 }),
				cnpjValidation({ name: "O CNPJ" }),
			],
			key: "cnpj",
			mask: cnpjMask,
			maxLength: 18,
			loading: false,

		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "Razão social",
			errorMensages: null,
			rules: [
				requiredValidation({ name: "A razão social" }),
				minLengthValidation({ name: "A razão social", number: 2 }),
				maxLengthValidation({ name: "A razão social", number: 70 }),
			],
			key: "corporateName",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "Nome fantasia",
			errorMensages: null,
			rules: [
				minLengthValidation({ name: "O nome fantasia", number: 2 }),
				maxLengthValidation({ name: "O nome fantasia", number: 70 }),
			],
			key: "fantasyName",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "select",
			label: "Tipo",
			errorMensages: null,
			rules: [requiredValidation({ name: "O Tipo" })],
			items: ["Matriz", "Filial"],
			key: "type",
		},

		{
			cols: 12,
			sm: 8,
			md: 8,
			// type: "autocomplete",
			// label: "Representante Legal",
			// errorMensages: null,
			// rules: [
			// ],
			// items: customers.data,
			key: "customerId",
		},

	];

}

export function companyFieldsOptional() {

	return [

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
			md: 2,
			type: "text",
			label: "NIRE",
			errorMensages: null,
			rules: [
				minLengthValidation({ name: "O NIRE", number: 7 }),
				maxLengthValidation({ name: "O NIRE", number: 12 }),
			],
			key: "nire",
		},
		{
			cols: 12,
			sm: 6,
			md: 2,
			type: "text",
			label: "Inscrição Municipal",
			errorMensages: null,
			rules: [
				minLengthValidation({ name: "A inscrição municipal", number: 7 }),
				maxLengthValidation({ name: "A inscrição municipal", number: 12 }),
			],
			key: "municipalRegistration",
		},
		{
			cols: 12,
			sm: 6,
			md: 2,
			type: "text",
			label: "Inscrição Estadual",
			errorMensages: null,
			rules: [
				minLengthValidation({ name: "A inscrição estadual", number: 7 }),
				maxLengthValidation({ name: "A inscrição estadual", number: 12 }),
			],
			key: "stateRegistration",
		},

	];
}

