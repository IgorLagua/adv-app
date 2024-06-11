
const {
	requiredValidation,
	equalLengthValidation,
	minLengthValidation,
	maxLengthValidation,
} = useValidation();

const { zipCodeMask } = useMask();
const { brazilianStates } = utilsComposable();

export function addressFieldsRequired() {

	return [
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "template",
			label: "CEP",
			errorMensages: null,
			rules: [
				requiredValidation({ name: "O CEP" }),
				equalLengthValidation({ name: "O CEP", number: 9 }),
			],
			key: "zipCode",
			mask: zipCodeMask,
			maxLength: 9,
			loading: false,
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "Endereço",
			errorMensages: null,
			rules: [
				requiredValidation({ name: "O Endereço" }),
				minLengthValidation({ name: "O Endereço", number: 2 }),
				maxLengthValidation({ name: "O Endereço", number: 70 }),
			],
			key: "address",
		},
		{
			cols: 12,
			sm: 6,
			md: 2,
			type: "text",
			label: "Número",
			errorMensages: null,
			rules: [
				requiredValidation({ name: "O Número" }),
				maxLengthValidation({ name: "O Número", number: 8 }),
			],
			key: "number",
		},
		{
			cols: 12,
			sm: 6,
			md: 2,
			type: "text",
			label: "Complemento",
			errorMensages: null,
			rules: [
				minLengthValidation({ name: "O Complemento", number: 2 }),
				maxLengthValidation({ name: "O Complemento", number: 25 }),
			],
			key: "complement",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "Bairro",
			errorMensages: null,
			rules: [
				requiredValidation({ name: "O Bairro" }),
				minLengthValidation({ name: "O Bairro", number: 2 }),
				maxLengthValidation({ name: "O Bairro", number: 30 }),
			],
			key: "district",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "text",
			label: "Cidade",
			errorMensages: null,
			rules: [
				requiredValidation({ name: "A Cidade" }),
				minLengthValidation({ name: "A Cidade", number: 2 }),
				maxLengthValidation({ name: "A Cidade", number: 30 }),
			],
			key: "city",
		},
		{
			cols: 12,
			sm: 6,
			md: 4,
			type: "select",
			label: "Estado",
			errorMensages: null,
			rules: [requiredValidation({ name: "O Estado" })],
			items: brazilianStates,
			key: "state",
		},
	];

}
