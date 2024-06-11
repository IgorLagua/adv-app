import { useUsersStore } from '~/stores/adm/users'
import { useCustomersStore } from '~/stores/adm/customers'
import { useCompaniesStore } from '~/stores/adm/companies'

const storeTypes = {
	user: useUsersStore,
	customer: useCustomersStore,
	company: useCompaniesStore,
};

// Remove caracteres especiais do número
const cleanPhoneNumber = (phone) => phone.number.replace(/[\(\)\-\s]/g, '');

const updatePhoneData = (type, data, id) => {
	const store = storeTypes[type]();
	store.formData.phones = JSON.parse(JSON.stringify(data));
	const index = store.data.findIndex(el => el.id === id);
	store.data[index].phones = [...data];
};

const clearPhoneData = (type, id) => {
	const store = storeTypes[type]();
	const index = store.data.findIndex(el => el.id === id);
	store.data[index].phones = [];
};

const actions = {

	async storeApiAction(formData) {

		// Remover caracteres dos números dos telefones
		formData.phones.forEach(phone => {
			phone.number = cleanPhoneNumber(phone);
		});

		const endpoint = "phones";
		const options = {
			method: 'POST',
			body: formData
		};

		const { data, errorValue } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			if (storeTypes[formData.type]) {
				updatePhoneData(formData.type, data.data, formData.id);
			}
		}

		else {
			this.apiErrors = errorValue.errors
		}

	},

	// async storeApiAction(formData) {
	// 	// console.log('formData', formData);

	// 	// Remover caracteres dos números dos telefones
	// 	formData.phones.forEach(phone => {
	// 		// Remove caracteres especiais do número
	// 		phone.number = phone.number.replace(/[\(\)\-\s]/g, '');
	// 	});


	// 	// console.log('newFormData', newFormData);

	// 	// console.log('newFormData.id', newFormData.id);

	// 	try {
	// 		const { data, error, fetchData } = fetchApi('phones', {
	// 			// queryParams: paramsData,
	// 			method: 'POST',
	// 			body: formData
	// 		});
	// 		await fetchData();

	// 		if (data.value && data.value.errors) {	//erro de validação do servidor
	// 			this.apiErrors = data.value.errors
	// 		}
	// 		else if (data.value && !data.value.errors) {	// Sem erro
	// 			this.apiErrors = {}
	// 			// console.log('data.value', data.value);
	// 			// this.formData = [...data.value.data]
	// 			// const customers = useCustomersStore()
	// 			// customers.data[0].phones = [...data.value.data]


	// 			// const index = customers.data.findIndex(el => el.id === formData.id)
	// 			// customers.data[index].phones = [...data.value.data]

	// 			if (formData.type === 'user') {
	// 				// const users = useUsersStore()
	// 				// users.formData.phones = [...data.value.data]
	// 				// const index = users.data.findIndex(el => el.id === formData.id)
	// 				// users.data[index].phones = [...data.value.data]
	// 			} else if (formData.type === 'customer') {
	// 				const customers = useCustomersStore()
	// 				customers.formData.phones = [...data.value.data]
	// 				const index = customers.data.findIndex(el => el.id === formData.id)
	// 				customers.data[index].phones = [...data.value.data]
	// 			} else if (formData.type === 'company') {
	// 				const companies = useCompaniesStore()
	// 				companies.formData.phones = [...data.value.data]
	// 				const index = companies.data.findIndex(el => el.id === formData.id)
	// 				companies.data[index].phones = [...data.value.data]
	// 			}

	// 			// customers.formData.phones = [...data.value.data]

	// 			// this.apiErrors = {}
	// 			// this.formData = data.value.data
	// 			// const customers = useCustomersStore()
	// 			// customers.formData.address = {...data.value.data}

	// 			// console.log('customers', customers);
	// 			// console.log('customers.data', customers.data);
	// 			// console.log('this.data', this.data);

	// 			// // 	this.data.unshift(data.value.data)
	// 			// // 	this.totalItems = this.totalItems + 1

	// 		}

	// 	} catch (error) {
	// 		console.error('Catch block error:', error);
	// 	}
	// },


	async updateApiAction(formData) {

		const formattedFormData = deepClone(formData)
		// Remover caracteres dos números dos telefones
		formattedFormData.phones.forEach(phone => {
			phone.number = cleanPhoneNumber(phone);
		});

		// console.log('formattedFormData', formattedFormData);
		const endpoint = `phones/${formData.id}`;
		const options = {
			method: 'PUT',
			body: formattedFormData
		};

		const { data, error } = await useApi(endpoint, options);


		if (data) {
			this.apiErrors = {};
			if (storeTypes[formData.type]) {
				updatePhoneData(formData.type, data.data, formData.id);
			}

			else {
				this.apiErrors = error
			}


			
		}



		// try {
		// 	// const { data, error } = useApi(`phones/${formData.id}`, {
		// 	// 	// queryParams: paramsData,
		// 	// 	method: 'PUT',
		// 	// 	body: formData
		// 	// });
		// 	// await fetchData();

		// 	if (data.value) {
		// 		if (data.value.errors) {
		// 			this.apiErrors = data.value.errors;
		// 		} else {
		// 			this.apiErrors = {};
		// 			if (storeTypes[formData.type]) {
		// 				updatePhoneData(formData.type, data.value.data, formData.id);
		// 			}
		// 		}
		// 	}
		// } catch (error) {
		// 	console.error('Catch block error:', error);
		// }

		// if (data.value && data.value.errors) {	//erro de validação do servidor
		// 	this.apiErrors = data.value.errors
		// }
		// else if (data.value && !data.value.errors) {	// Sem erro
		// 	this.apiErrors = {}
		// 	// console.log('data.value', data.value);

		// 	const customers = useCustomersStore()
		// 	// customers.data[0].phones = [...data.value.data]
		// 	// customers.data[0].phones = [...data.value.data]

		// 	const index = customers.data.findIndex(el => el.id === formData.id)
		// 	customers.data[index].phones = [...data.value.data]
		// 	customers.formData.phones = [...data.value.data]
		// 	// this.formData = {...data.value.data}
		// 	// console.log('this.data', this.data);

		// 	// this.data.unshift(data.value.data)

		// }
		// 	// else if (data.value) {

		// 	// }
		// } catch (error) {
		// 	console.error('Catch block error:', error);
		// }

	},


	async destroyApiAction(formData) {
		try {
			const { data, error, fetchData } = fetchApi(`phones/${formData.id}`, {
				method: 'DELETE',
				body: formData
			});
			await fetchData();

			if (data.value) {
				if (data.value.errors) {
					this.apiErrors = data.value.errors;
				} else {
					this.apiErrors = {};
					if (storeTypes[formData.type]) {
						clearPhoneData(formData.type, formData.id);
					}
				}
			}
		} catch (error) {
			console.error('Catch block error:', error);
		}
	},

	// };
	// async destroyApiAction(customerId) {
	// 	// console.log('customerId', customerId);

	// 	try {
	// 		const { data, error, fetchData } = fetchApi(`phones/${formData.type}/${formData.id}`, {
	// 			// queryParams: paramsData,
	// 			method: 'DELETE',
	// 			// body: newFormData
	// 		});
	// 		await fetchData();

	// 		if (data.value && data.value.errors) {	//erro de validação do servidor
	// 			this.apiErrors = data.value.errors
	// 		}
	// 		else if (data.value && !data.value.errors) {	// Sem erro
	// 			this.apiErrors = {}
	// 			// console.log('data.value', data.value);
	// 			// this.formData = [...data.value.data]
	// 			const customers = useCustomersStore()
	// 			const index = customers.data.findIndex(el => el.id === customerId)
	// 			customers.data[index].phones = []


	// 			// customers.formData.phones = [...data.value.data]

	// 			// this.apiErrors = {}
	// 			// this.formData = data.value.data
	// 			// const customers = useCustomersStore()
	// 			// customers.formData.address = {...data.value.data}

	// 			// console.log('customers', customers);
	// 			// console.log('customers.data', customers.data);
	// 			// console.log('this.data', this.data);

	// 			// // 	this.data.unshift(data.value.data)
	// 			// // 	this.totalItems = this.totalItems + 1

	// 		}

	// 	} catch (error) {
	// 		console.error('Catch block error:', error);
	// 	}
	// },
};

export default { ...actions };