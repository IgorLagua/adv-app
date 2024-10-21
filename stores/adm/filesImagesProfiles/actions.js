import { useAuthenticationStore } from "~/stores/site/authentication";

const actions = {

	async indexApiAction(paramsData) {

		// console.log('paramsData', paramsData);
		// const authentication = useAuthenticationStore();
		// paramsData.tenantIds = authentication.tenantIds

		const existingData = this.storeData.find(el => JSON.stringify(el.paramsData) === JSON.stringify(paramsData));
		// console.log('existingData', existingData);
		if (existingData) {
			this.data = existingData.data;
			// this.formData = existingData.data;
			this.totalItems = existingData.totalItems;
			return; // Retorna se os dados já existem
		}


		const endpoint = "customers";
		const options = {
			query: paramsData,
			headers: {
				resourceName: "customer",
				permissionName: "index"
			}
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			this.storeData.push({
				data: data.data,
				totalItems: data.meta.total,
				paramsData,
			});
			this.data = data.data;
			this.totalItems = data.meta.total;

			// Se existe paramsData.columns, adicionar objetos não repetidos do array data.data no array this.data
			data.data.forEach(obj => {
				// Verifica se um objeto com o mesmo id já existe em this.dataAutoComplete
				const exists = this.data.some(existingObj => existingObj.id === obj.id);

				// Se o objeto não existe, adiciona-o ao array
				if (!exists) {
					this.data.push(obj);
				}
			});



		}
		else {
			this.apiErrors = error
		}

	},



	async uploadApiAction(formData) {

		// // ver os valores do FormData -- O console.log direto de um FormData não mostra o conteúdo diretamente, por isso pode parecer que está vazio, mas na verdade pode estar preenchido corretamente.
		// for (let [key, value] of formData.entries()) {
		// 	console.log(key, value);
		// }

		const endpoint = "files_images_profiles";
		const options = {
			method: 'POST',
			body: formData,
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
		}

		else {
			this.apiErrors = error
		}
	},



	async showApiAction(id) {

		// console.log('id', id);

		const existingData = this.data.find(el => el.id === id);	//Se os IDs são números ou strings simples, o uso de JSON.stringify é desnecessário.
		// console.log('existingData', existingData);

		if (existingData) {
			this.formData = existingData.blobUrl;
			return; // Retorna se os dados já existem
		}


		const endpoint = `files_images_profiles/show/${id}`;
		const options = {
			method: 'GET',
			headers: {
				'Cache-Control': 'no-cache',
			}
		};


		const { data, error } = await useApi(endpoint, options);

		// console.log('data', data);
		// console.log('error', error);

		if (data) {
			this.apiErrors = {}

			const blobUrl = URL.createObjectURL(data)

			// this.formData = data
			this.formData = blobUrl
			// const index = this.data.findIndex(el => el.id === id)
			// if (index > -1) {
			// 	this.data[index] = { ...blobUrl }
			// } else {
			this.data.push({ blobUrl: blobUrl, id: id })
			// }
		}

		else {
			this.apiErrors = error
		}
	},


	async downloadApiAction(id) {

		console.log('id', id);

		const existingData = this.data.find(el => el.id === id);	//Se os IDs são números ou strings simples, o uso de JSON.stringify é desnecessário.

		if (existingData) {
			this.formData = existingData;
			return; // Retorna se os dados já existem
		}


		const endpoint = `files/${id}`;
		const options = {
			method: 'GET',
		};


		const { data, error } = await useApi(endpoint, options);

		// console.log('data', data);
		// console.log('error', error);

		if (data) {
			this.apiErrors = {}
			this.formData = data.data
			const index = this.data.findIndex(el => el.id === id)
			if (index > -1) {
				this.data[index] = { ...data.data }
			} else {
				this.data.push(data.data)
			}
		}

		else {
			this.apiErrors = error
		}
	},




	// async showApiAction(id) {

	// 	const existingData = this.data.find(el => el.id === id && 'rg' in el);	//Se os IDs são números ou strings simples, o uso de JSON.stringify é desnecessário.

	// 	if (existingData) {
	// 		this.formData = deepClone(existingData);
	// 		return; // Retorna se os dados já existem
	// 	}

	// 	const endpoint = `customers/${id}`;
	// 	const options = {
	// 		headers: {
	// 			resourceName: "customer",
	// 			permissionName: "show"
	// 		}
	// 	};

	// 	const { data, error } = await useApi(endpoint, options);

	// 	if (data) {
	// 		this.apiErrors = {}
	// 		this.formData = deepClone(data.data)
	// 		const index = this.data.findIndex(el => el.id === id)
	// 		if (index > -1) {
	// 			this.data[index] = { ...data.data }
	// 		} else {
	// 			this.data.push(data.data)
	// 		}
	// 	}

	// 	else {
	// 		this.apiErrors = error
	// 	}
	// },

	// Quando seleciona dados do AutoComplete --> usado no Modelo Padrão
	// async showAutoCompleteApiAction(customerId) {

	// 	// const authentication = useAuthenticationStore();
	// 	// paramsData.tenantIds = authentication.tenantIds

	// 	const existingData = this.dataSelectedAutoComplete.find(el => JSON.stringify(el.id) === JSON.stringify(customerId));

	// 	if (existingData) {
	// 		this.formData = existingData;
	// 		return; // Retorna se os dados já existem
	// 	} else {
	// 		const endpoint = `customers/${customerId}`;
	// 		const options = {
	// 			headers: {
	// 				resourceName: "customer",
	// 				permissionName: "show"
	// 			}
	// 		};

	// 		const { data, error } = await useApi(endpoint, options);

	// 		if (data) {
	// 			this.apiErrors = {}
	// 			this.formData = deepClone(data.data)
	// 			this.dataSelectedAutoComplete.push(data.data)
	// 			// const index = this.dataAutoComplete.findIndex(el => el.id === customerId)
	// 			// this.dataAutoComplete[index] = { ...data.data }
	// 		}

	// 		else {
	// 			this.apiErrors = error
	// 		}
	// 	}
	// },


	async updateApiAction(formData) {

		const formDataClone = deepClone(formData);

		// Remover pontos e traço do CPF
		formDataClone.cpf = formatCpf(formDataClone.cpf);

		const endpoint = `customers/${formData.id}`;
		const options = {
			method: 'PUT',
			body: formDataClone,
			headers: {
				resourceName: "customer",
				permissionName: "update"
			}
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
			headers: {
				resourceName: "customer",
				permissionName: "delete"
			}
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


