import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';

export const useCustomersStore = defineStore('customers', {
	state: () => ({

		fieldConfigMandatory: [],
		fieldConfigOptional: [],

		openModalForm: false,		
		isLoading: false,
		
		formData: {},

		totalItems: 0,

		apiErrors: {},
		
		storeData: [],
		data: [],
		
		dataAutoComplete: [],			// Armazena id, cpf e name para vizualização do AutoComplete
		dataSelectedAutoComplete: [],	// Armazena todos os dados do cliente para seleção nos modelos padrão
		storeDataAutoComplete: [],		// Armazena paramsData para não fazer novas requisições se já existe o dados em dataAutoComplete

	}),
	getters,
	actions,

});



