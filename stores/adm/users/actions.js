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

			const endpoint = "users";
			const options = {
				query: paramsData,
			};

			const { data } = await useApi(endpoint, options);
			// console.log('data', data);

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

	

	async storeApiAction(formData) {

		const endpoint = "users";
		const options = {
			method: 'POST',
			body: formData
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			this.data.unshift(data.data)
			// this.formData = deepClone(data.data)
			this.totalItems++
		}

		else {
			this.apiErrors = error
		}
	},

	async showApiAction(id) {

		const endpoint = `users/${id}`;

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

	async showAutoCompleteApiAction(userId) {

		// const authentication = useAuthenticationStore();
		// paramsData.tenantIds = authentication.tenantIds

		const existingData = this.dataSelectedAutoComplete.find(el => JSON.stringify(el.id) === JSON.stringify(userId));

		if (existingData) {
			this.formData = existingData;
			return; // Retorna se os dados já existem
		} else {
			const endpoint = `users/${userId}`;

			const { data } = await useApi(endpoint);

			if (data) {
				this.apiErrors = {}
				this.formData = deepClone(data.data)
				this.dataSelectedAutoComplete.push(data.data)
				// const index = this.dataAutoComplete.findIndex(el => el.id === userId)
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

		const endpoint = `users/${formData.id}`;
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

	async destroyApiAction(userId) {

		const endpoint = `users/${userId}`;

		const options = {
			method: 'DELETE',
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			const index = this.data.findIndex(el => el.id === userId)
			this.data.splice(index, 1);
			this.totalItems--
		}

		else {
			this.apiErrors = error
		}
	},

};

export default { ...actions };

