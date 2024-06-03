import { useUsersStore } from '~/stores/adm/users'
import { useCustomersStore } from '~/stores/adm/customers'
import { useCompaniesStore } from '~/stores/adm/companies'

const storeTypes = {
	user: useUsersStore,
	customer: useCustomersStore,
	company: useCompaniesStore,
};

const updateAddressData = (type, data, id) => {
	const store = storeTypes[type]();
	store.formData.address = { ...data };
	const index = store.data.findIndex(el => el.id === id);
	store.data[index].address = { ...data };
};

const actions = {

	initializeFieldConfig(
		requiredValidation,
		equalLengthValidation,
		minLengthValidation,
		maxLengthValidation,
		zipCodeMask,
		brazilianStates,
		loadingZipCode,
	) {

		this.fieldConfig = [
			{
				cols: 12,
				sm: 6,
				md: 4,
				type: "template",
				label: "CEP",
				errorMensages: null,
				rules: [
					requiredValidation({ name: "O CEP" }),
					equalLengthValidation({ name: "O CEP", number: 9 }),
				],
				key: "zipCode",
				mask: zipCodeMask,
				maxLength: 9,
				loading: loadingZipCode,
			},
			{
				cols: 12,
				sm: 6,
				md: 4,
				type: "text",
				label: "Endereço",
				errorMensages: null,
				rules: [
					requiredValidation({ name: "O Endereço" }),
					minLengthValidation({ name: "O Endereço", number: 2 }),
					maxLengthValidation({ name: "O Endereço", number: 70 }),
				],
				key: "address",
			},
			{
				cols: 12,
				sm: 6,
				md: 2,
				type: "text",
				label: "Número",
				errorMensages: null,
				rules: [
					requiredValidation({ name: "O Número" }),
					maxLengthValidation({ name: "O Número", number: 8 }),
				],
				key: "number",
			},
			{
				cols: 12,
				sm: 6,
				md: 2,
				type: "select",
				label: "Estado",
				errorMensages: null,
				rules: [requiredValidation({ name: "O Estado" })],
				items: brazilianStates,
				key: "state",
			},
			{
				cols: 12,
				sm: 6,
				md: 4,
				type: "text",
				label: "Complemento",
				errorMensages: null,
				rules: [
					minLengthValidation({ name: "O Complemento", number: 2 }),
					maxLengthValidation({ name: "O Complemento", number: 25 }),
				],
				key: "complement",
			},
			{
				cols: 12,
				sm: 6,
				md: 4,
				type: "text",
				label: "Bairro",
				errorMensages: null,
				rules: [
					requiredValidation({ name: "O Bairro" }),
					minLengthValidation({ name: "O Bairro", number: 2 }),
					maxLengthValidation({ name: "O Bairro", number: 30 }),
				],
				key: "district",
			},
			{
				cols: 12,
				sm: 6,
				md: 4,
				type: "text",
				label: "Cidade",
				errorMensages: null,
				rules: [
					requiredValidation({ name: "A Cidade" }),
					minLengthValidation({ name: "A Cidade", number: 2 }),
					maxLengthValidation({ name: "A Cidade", number: 30 }),
				],
				key: "city",
			},
		];
	},

	async storeApiAction(formData) {

		const formDataClone = deepClone(formData);

		// Remover traço do zipCode
		formDataClone.zipCode = formatCep(formDataClone.zipCode);


		const endpoint = "addresses";
		const options = {
			method: 'POST',
			body: formDataClone
		};

		const { data, errorValue } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			if (storeTypes[formDataClone.type]) {
				updateAddressData(formDataClone.type, data.data, formDataClone.id);
			}
		}

		else {
			this.apiErrors = errorValue.errors
		}

		// if (status.value === 'success') {
		// 	if (data.value.errors) {
		// 		this.apiErrors = data.value.errors;
		// 	} else {
		// 		this.apiErrors = {};
		// 		if (storeTypes[formData.type]) {
		// 			updateAddressData(formData.type, data.value.data, formData.id);
		// 		}
		// 	}
		// }





		// const { data, error, fetchData } = fetchApi('addresses', {
		// 	method: 'POST',
		// 	body: formDataClone
		// });
		// await fetchData();

		// if (data.value) {
		// 	if (data.value.errors) {
		// 		this.apiErrors = data.value.errors;
		// 	} else {
		// 		this.apiErrors = {};
		// 		if (storeTypes[formData.type]) {
		// 			updateAddressData(formData.type, data.value.data, formData.id);
		// 		}
		// 	}
		// }

	},
};

export default { ...actions };

