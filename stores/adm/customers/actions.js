import { useAuthenticationStore } from "~/stores/site/authentication";


const actions = {

	initializeFieldConfigMandatory(
		requiredValidation,
		equalLengthValidation,
		minLengthValidation,
		maxLengthValidation,
		cpfMask,
		nationalities,
		// loadingZipCode,
	) {

		this.fieldConfigMandatory = [

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
					// cpfValidation ({name: 'O CPF'}),
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
	},

	initializeFieldConfigOptional(
		emailValidation,
		minLengthValidation,
		maxLengthValidation,
		brazilianStates,
	) {

		this.fieldConfigOptional = [

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
				key: "classEntityNumber",
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
				key: "classEntityType",
			},
			{
				cols: 12,
				sm: 6,
				md: 4,
				type: "select",
				label: "Estado entidade",
				errorMensages: null,
				rules: [],
				items: brazilianStates,
				key: "classEntityState",
			},
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
	},

	async indexApiAction(paramsData) {
		
		const authentication = useAuthenticationStore();
		paramsData.tenantIds = authentication.tenantIds
		
		const existingData = this.storeData.find(el => JSON.stringify(el.paramsData) === JSON.stringify(paramsData));

		if (existingData) {
			this.data = existingData.data;
			this.totalItems = existingData.totalItems;
			return; // Retorna se os dados já existem
		}
		else {

			const endpoint = "customers";
			const options = {
				query: paramsData,
			};

			const { data, error } = await useApi(endpoint, options);

			if (data) {
				this.storeData.push({
					data: data.data,
					totalItems: data.meta.total,
					paramsData,
				});
				this.data = data.data;
				this.totalItems = data.meta.total;
				this.apiErrors = {}
			}

			else {
				this.apiErrors = error
			}
		}
	},

	// Quando procua dados pelo AutoComplete
	async indexAutoCompleteApiAction(paramsData) {

		const authentication = useAuthenticationStore();
		paramsData.tenantIds = authentication.tenantIds

		const existingData = this.storeDataAutoComplete.find(el => JSON.stringify(el.paramsData) === JSON.stringify(paramsData));

		if (existingData) {
			return; // Retorna se os dados já existem
		}
		else {

			const endpoint = "customers";
			const options = {
				query: paramsData,
			};

			const { data } = await useApi(endpoint, options);

			if (data) {

				this.storeDataAutoComplete.push({
					paramsData,
				});

				// Se existe paramsData.columns, adicionar objetos não repetidos do array data.data no array this.storeDataAutoComplete
				data.data.forEach(obj => {
					// Verifica se um objeto com o mesmo id já existe em this.dataAutoComplete
					const exists = this.dataAutoComplete.some(existingObj => existingObj.id === obj.id);

					// Se o objeto não existe, adiciona-o ao array
					if (!exists) {
						this.dataAutoComplete.push(obj);
					}
				});
			}
		}
	},



	async storeApiAction(formData) {

		const formDataClone = deepClone(formData);

		// Remover pontos e traço do CPF
		formDataClone.cpf = formatCpf(formDataClone.cpf);

		const endpoint = "customers";
		const options = {
			method: 'POST',
			body: formDataClone
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			this.data.unshift(data.data)
			this.formData = deepClone(data.data)
			this.totalItems++
		}

		else {
			this.apiErrors = error
		}
	},

	async showApiAction(id) {

		const endpoint = `customers/${id}`;

		const { data } = await useApi(endpoint);

		if (data) {
			this.apiErrors = {}
			this.formData = deepClone(data.data)
			const index = this.data.findIndex(el => el.id === id)
			this.data[index] = { ...data.data }
		}

		else {
			this.apiErrors = error
		}
	},

	async showAutoCompleteApiAction(customerId) {

		// const authentication = useAuthenticationStore();
		// paramsData.tenantIds = authentication.tenantIds

		const existingData = this.dataSelectedAutoComplete.find(el => JSON.stringify(el.id) === JSON.stringify(customerId));

		if (existingData) {
			this.formData = existingData;
			return; // Retorna se os dados já existem
		} else {
			const endpoint = `customers/${customerId}`;

			const { data } = await useApi(endpoint);

			if (data) {
				this.apiErrors = {}
				this.formData = deepClone(data.data)
				this.dataSelectedAutoComplete.push(data.data)
				// const index = this.dataAutoComplete.findIndex(el => el.id === customerId)
				// this.dataAutoComplete[index] = { ...data.data }
			}

			else {
				this.apiErrors = error
			}
		}
	},


	async updateApiAction(formData) {

		const formDataClone = deepClone(formData);

		// Remover pontos e traço do CPF
		formDataClone.cpf = formatCpf(formDataClone.cpf);

		const endpoint = `customers/${formData.id}`;
		const options = {
			method: 'PUT',
			body: formDataClone
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			const index = this.data.findIndex(el => el.id === formData.id)
			this.formData = deepClone(data.data)
			this.data[index] = { ...data.data }
		}

		else {
			this.apiErrors = error
		}
	},

	async destroyApiAction(customerId) {

		const endpoint = `customers/${customerId}`;

		const options = {
			method: 'DELETE',
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			const index = this.data.findIndex(el => el.id === customerId)
			this.data.splice(index, 1);
			this.totalItems--
		}

		else {
			this.apiErrors = error
		}
	},

};

export default { ...actions };

