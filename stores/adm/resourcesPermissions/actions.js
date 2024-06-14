import { useAuthenticationStore } from "~/stores/site/authentication";


const actions = {

	async indexApiAction(formData) {
		
		const authentication = useAuthenticationStore();
		formData.tenantIds = authentication.tenantIds
		
		const existingData = this.storeData.find(el => JSON.stringify(el.formData) === JSON.stringify(formData));

		if (existingData) {
			this.data = existingData.data;
			return; // Retorna se os dados já existem
		}
		else {
			const endpoint = "resources_permissions";
			const options = {
				query: formData,
			};

			const { data, error } = await useApi(endpoint, options);

			if (data) {
				this.storeData.push({
					data: data.data,
					formData,
				});
				this.data = data.data;
				this.apiErrors = {}
			}

			else {
				this.apiErrors = error
			}
		}
	},



	async storeApiAction(formData) {

		const endpoint = "resources_permissions";
		const options = {
			method: 'POST',
			body: formData
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			this.data = formData.resourcesPermissions
		}

		else {
			this.apiErrors = error
		}
	},

	// async showApiAction(id) {

	// 	const endpoint = `resources_permissions/${id}`;

	// 	const { data } = await useApi(endpoint);

	// 	if (data) {
	// 		this.apiErrors = {}
	// 		this.formData = deepClone(data.data)
	// 		const index = this.data.findIndex(el => el.id === id)
	// 		this.data[index] = { ...data.data }
	// 	}

	// 	else {
	// 		this.apiErrors = error
	// 	}
	// },


	// async updateApiAction(formData) {

	// 	const endpoint = `resources_permissions/${formData.id}`;
	// 	const options = {
	// 		method: 'PUT',
	// 		body: formData
	// 	};

	// 	const { data, error } = await useApi(endpoint, options);

	// 	if (data) {
	// 		this.apiErrors = {}
	// 		const index = this.data.findIndex(el => el.id === formData.id)
	// 		this.formData = deepClone(data.data)
	// 		this.data[index] = { ...data.data }
	// 	}

	// 	else {
	// 		this.apiErrors = error
	// 	}
	// },

	// async destroyApiAction(id) {

	// 	const endpoint = `resources_permissions/${id}`;

	// 	const options = {
	// 		method: 'DELETE',
	// 	};

	// 	const { data, error } = await useApi(endpoint, options);

	// 	if (data) {
	// 		this.apiErrors = {}
	// 		const index = this.data.findIndex(el => el.id === id)
	// 		this.data.splice(index, 1);
	// 		this.totalItems--
	// 	}

	// 	else {
	// 		this.apiErrors = error
	// 	}
	// },

};

export default { ...actions };

