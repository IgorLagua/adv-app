import { useAuthenticationStore } from "~/stores/site/authentication";

const actions = {

	initializeFieldConfigMandatory(
		requiredValidation,
		equalLengthValidation,
		minLengthValidation,
		maxLengthValidation,
		cnpjValidation,
		cnpjMask,
		loadingCnpj,
	) {

		this.fieldConfigMandatory = [

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
				loading: loadingCnpj,

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
	},

	initializeFieldConfigOptional(
		emailValidation,
		minLengthValidation,
		maxLengthValidation,
	) {

		this.fieldConfigOptional = [

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
			const endpoint = "companies";
			const options = {
				query: paramsData,
			};

			const { data } = await useApi(endpoint, options);

			if (data) {
				this.storeData.push({
					data: data.data,
					totalItems: data.meta.total,
					paramsData,
				});
				this.data = data.data;
				this.totalItems = data.meta.total;
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

			const endpoint = "companies";
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

		// Remover pontos, traços e barras do CNPJ
		formDataClone.cnpj = formatCnpj(formDataClone.cnpj);

		const endpoint = "companies";
		const options = {
			method: 'POST',
			body: formDataClone
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			// console.log("data", data.value);

			this.apiErrors = {}
			this.data.unshift(data.data)
			this.formData = deepClone(data.data)
			// this.formData = JSON.parse(JSON.stringify(data.data))
			this.totalItems++
		}

		else {
			this.apiErrors = error
		}
	},


	async showApiAction(id) {

		const endpoint = `companies/${id}`;

		const { data } = await useApi(endpoint);

		if (data) {

			this.apiErrors = {}

			// this.formData = JSON.parse(JSON.stringify(data.data))    //Clonagem Profunda garante que cada nível do objeto seja uma nova referência, pois da maneira convencional quando mudava o endereço ou o telefone no 'formData', mudava tambem o array 'data'
			this.formData = deepClone(data.data)    //Clonagem Profunda garante que cada nível do objeto seja uma nova referência, pois da maneira convencional quando mudava o endereço ou o telefone no 'formData', mudava tambem o array 'data'
			const index = this.data.findIndex(el => el.id === id)
			this.data[index] = { ...data.data }

		}

		else {
			this.apiErrors = error
		}

	},


	async showAutoCompleteApiAction(companyId) {

		const existingData = this.dataSelectedAutoComplete.find(el => JSON.stringify(el.id) === JSON.stringify(companyId));

		if (existingData) {
				this.formData = existingData;
				return; // Retorna se os dados já existem
		} else {
			const endpoint = `companies/${companyId}`;

			const { data } = await useApi(endpoint);

			if (data) {
				this.apiErrors = {}
				this.formData = deepClone(data.data)
				this.dataSelectedAutoComplete.push(data.data)
				// const index = this.dataAutoComplete.findIndex(el => el.id === companyId)
				// this.dataAutoComplete[index] = { ...data.data }
			}

			else {
				this.apiErrors = error
			}
		}
	},


	async updateApiAction(formData) {

		const formDataClone = deepClone(formData);

		// Remover pontos e traço do CNPJ
		formDataClone.cnpj = formatCnpj(formDataClone.cnpj);

		const endpoint = `companies/${formDataClone.id}`;
		const options = {
			method: 'PUT',
			body: formDataClone
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			const index = this.data.findIndex(el => el.id === formData.id)
			// this.formData = JSON.parse(JSON.stringify(data.data))
			this.formData = deepClone(data.data)
			this.data[index] = { ...data.data }
		}

		else {
			this.apiErrors = error
		}
	},


	async destroyApiAction(companyId) {

		const endpoint = `companies/${companyId}`;

		const options = {
			method: 'DELETE',
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			const index = this.data.findIndex(el => el.id === companyId)
			this.data.splice(index, 1);
			this.totalItems--
		}

		else {
			this.apiErrors = error
		}
	},

};

export default { ...actions };


