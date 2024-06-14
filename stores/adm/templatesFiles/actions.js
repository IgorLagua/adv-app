import { useTemplatesStore } from '~/stores/adm/templates'

const actions = {

	async indexApiAction(paramsData) {

		const templates = useTemplatesStore();

		// console.log('paramsData0', paramsData)

		let existingDataAutoComplete = null
		let existingDataTable = null

		// Se não existe templates.showDialog significa que os modelos são para o AutoComplete
		if (!templates.showDialog) {
			existingDataAutoComplete = this.dataStoreAutoComplete.find(el => JSON.stringify(el.paramsData) === JSON.stringify(paramsData));
		}

		// Se tabela
		else {
			existingDataTable = this.dataStoreTable.find(el => JSON.stringify(el.paramsData) === JSON.stringify(paramsData));
			// console.log('existingDataTable', existingDataTable)
		}

		// Se AutoComplete
		if (existingDataAutoComplete) {
			this.dataAutoComplete = existingDataAutoComplete.data;
			return; // Retorna se os dados já existem
		}

		// Se tabela
		if (existingDataTable) {
			this.dataTable = existingDataTable.data;
			this.totalItems = existingDataTable.totalItems;
			return; // Retorna se os dados já existem
		}

		else {
			// console.log('paramsData', paramsData)
			const endpoint = "template_files";
			const options = {
				query: paramsData,
				headers: {
					resourceName: "template",
					permissionName: "index"
				}
			};

			const { data } = await useApi(endpoint, options);

			// if (status.value === 'success') {


			// Se AutoComplete
			if (!templates.showDialog) {
				this.dataStoreAutoComplete.push({
					data: data.data,
					paramsData,
				});
				this.dataAutoComplete = data.data;
			}

			// Se tabela
			else {
				// console.log('paramsData', paramsData)
				this.dataStoreTable.push({
					data: data.data,
					totalItems: data.meta.total,
					paramsData,
				});
				this.dataTable = data.data;
				this.totalItems = data.meta.total;

			}
		}
	},

	async showApiAction(id) {

		const existingData = this.dataStore.find(el => JSON.stringify(el.id) === JSON.stringify(id));

		if (existingData) {
			this.selected = existingData;
			return; // Retorna se os dados já existem
		}
		else {

			const endpoint = `template_files/${id}`;
			const options = {
				headers: {
					resourceName: "customer",
					permissionName: "show"
				}
			};

			const { data, error } = await useApi(endpoint, options);

			if (data) {
				this.apiErrors = {}
				this.dataStore.push(data.data);
				this.selected = data.data
				// const index = this.data.findIndex(el => el.id === id)
				// this.data[index] = { ...data.data }
			}

			else {
				this.apiErrors = error
			}
		}
	},

	async storeApiAction(formData) {
// console.log('formData', formData);
		const endpoint = "template_files";
		const options = {
			method: 'POST',
			body: formData,
			headers: {
				resourceName: "template",
				permissionName: "store"
			}
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			this.dataTable.unshift(data.data)
			this.totalItems++
		}

		else {
			this.apiErrors = error
		}
	},

	async updateApiAction(formData, permission) {
// console.log('formData', formData);
		const endpoint = `template_files/${formData.id}`;
		const options = {
			method: 'PUT',
			body: formData,
			headers: {
				resourceName: "template",
				permissionName: permission  	
			}
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			const index = this.dataTable.findIndex(el => el.id === formData.id)
			this.dataTable[index] = { ...data.data }
		}

		else {
			this.apiErrors = error
		}
	},


	async destroyApiAction(id) {

		const endpoint = `template_files/${id}`;

		const options = {
			method: 'DELETE',
			headers: {
				resourceName: "template",
				permissionName: "delete"
			}
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			const index = this.dataTable.findIndex(el => el.id === id)
			this.dataTable.splice(index, 1);
			this.totalItems--
		}

		else {
			this.apiErrors = error
		}
	},

};

export default { ...actions };



