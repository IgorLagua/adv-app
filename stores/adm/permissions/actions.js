import { useAuthenticationStore } from "~/stores/site/authentication";


const actions = {

	async indexApiAction(paramsData) {
		// console.log('paramsData', paramsData);

		if ( !paramsData ) {
			paramsData = {}
		}
		
		const authentication = useAuthenticationStore();
		paramsData.tenantIds = authentication.tenantIds
		const existingData = this.storeData.find(el => JSON.stringify(el.paramsData) === JSON.stringify(paramsData));

		if (existingData) {
			this.data = existingData.data;
			this.totalItems = existingData.totalItems;
			return; // Retorna se os dados já existem
		}
		else {

			const endpoint = "permissions";
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



	async storeApiAction(formData) {

		const endpoint = "permissions";
		const options = {
			method: 'POST',
			body: formData
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

		const endpoint = `permissions/${id}`;

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


	async updateApiAction(formData) {

		const endpoint = `permissions/${formData.id}`;
		const options = {
			method: 'PUT',
			body: formData
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

	async destroyApiAction(id) {

		const endpoint = `permissions/${id}`;

		const options = {
			method: 'DELETE',
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			const index = this.data.findIndex(el => el.id === id)
			this.data.splice(index, 1);
			this.totalItems--
		}

		else {
			this.apiErrors = error
		}
	},

};

export default { ...actions };

