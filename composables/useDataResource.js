const {
	requiredValidation,
	minLengthValidation,
	maxLengthValidation,
} = useValidation();

export function resourceFieldsRequired() {

	return [
		{
			cols: 12,
			type: "text",
			label: "Nome",
			errorMensages: null,
			rules: [
				requiredValidation({ name: "O nome" }),
				minLengthValidation({ name: "O nome", number: 2 }),
				maxLengthValidation({ name: "O nome", number: 70 }),
			],
			key: "name",
		},
		{
			cols: 12,
			type: "textArea",
			label: "Descrição",
			errorMensages: null,
			rules: [
				requiredValidation({ name: "A descrição" }),
				minLengthValidation({ name: "A descrição", number: 2 }),
				maxLengthValidation({ name: "A descrição", number: 255 }),
			],
			key: "description",
		},
	];
}