import { useTemplatesStore } from '~/stores/adm/templates'


const actions = {

	async indexApiAction(paramsData) {

		const templates = useTemplatesStore();
		// console.log('templates', templates)

		let existingDataAutoComplete = null
		let existingDataTable = null

		// Se não existe this.showDialog significa que as categorias são para o AutoComplete
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
			const endpoint = "template_categories";
			const options = {
				query: paramsData,
			};

			const { data } = await useApi(endpoint, options);

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

	async storeApiAction(formData) {

		const endpoint = "template_categories";
		const options = {
			method: 'POST',
			body: formData
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

	async updateApiAction(formData) {

		const endpoint = `template_categories/${formData.id}`;
		const options = {
			method: 'PUT',
			body: formData
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

		const endpoint = `template_categories/${id}`;

		const options = {
			method: 'DELETE',
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

