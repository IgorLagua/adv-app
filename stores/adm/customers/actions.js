import { useAuthenticationStore } from "~/stores/site/authentication";


const actions = {

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

