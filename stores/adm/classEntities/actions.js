
const actions = {

	async showApiAction(customerId) {

		const existingData = this.data.find(el => el[customerId]);

		if (existingData) {
			this.formData = existingData[customerId];
			return; // Retorna se os dados já existem
		}


		const endpoint = `class_entity/${customerId}`;
		const options = {
			headers: {
				resourceName: "customer",
				permissionName: "show"
			}
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			if (data.data.length > 0) {
				this.formData = deepClone(data.data)
				this.data.push({ [customerId]: data.data })
			} else {
				this.data.push({[customerId]: [
					{
						number: null,
						type: null,
						state: null
					}
				]})
				this.formData = [
					{
						number: null,
						type: null,
						state: null
					}
				]
			}
		}

		else {
			this.apiErrors = error
		}

	},


	async storeApiAction(formData, customerId) {
		
		const endpoint = "class_entity";
		const options = {
			method: 'POST',
			body: formData,
			headers: {
				resourceName: "customer",
				permissionName: "store"
			}
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			this.formData = deepClone(data.data)
			this.data.push({ [customerId]: data.data })

		}

		else {
			this.apiErrors = error
		}
	},

	async updateApiAction(formData, customerId) {
		
		const endpoint = `class_entity/${customerId}`;
		const options = {
			method: 'PUT',
			body: formData,
			headers: {
				resourceName: "customer",
				permissionName: "update"
			}
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			const index = this.data.findIndex(el => el.hasOwnProperty(customerId));		//el.hasOwnProperty(customers.formData.id): Verifica se o objeto el possui a chave customers.formData.id.
			if (data.data.length > 0) {
				this.data[index][customerId] = [...data.data]
				this.formData = deepClone(data.data)
			} else {
				this.data[index][customerId] = [
					{
						number: null,
						type: null,
						state: null
					}
				]
				this.formData = [
					{
						number: null,
						type: null,
						state: null
					}
				]
			}
		}

		else {
			this.apiErrors = error
		}
	},


};

export default { ...actions };



