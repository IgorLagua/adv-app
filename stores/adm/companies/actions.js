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
			const endpoint = "companies";
			const options = {
				query: paramsData,
				headers: {
					resourceName: "company",
					permissionName: "index"
				}
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


	// Quando procua dados pelo AutoComplete --> usado no Modelo Padrão
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
				headers: {
					resourceName: "company",
					permissionName: "index"
				}
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
			body: formDataClone,
			headers: {
				resourceName: "company",
				permissionName: "store"
			}
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
		const options = {
			headers: {
				resourceName: "company",
				permissionName: "show"
			}
		};

		const { data, error } = await useApi(endpoint, options);

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
			const options = {
				headers: {
					resourceName: "company",
					permissionName: "show"
				}
			};

			const { data, error } = await useApi(endpoint, options);

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
			body: formDataClone,
			headers: {
				resourceName: "company",
				permissionName: "update"
			}
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
			headers: {
				resourceName: "company",
				permissionName: "delete"
			}
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


