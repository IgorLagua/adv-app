import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';

export const useCompaniesStore = defineStore('companies', {
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


		// isDataLoaded: false, 	//Veriica se o dados já foi carregado pelo servidor SSR ou cliente

	}),
	getters,
	actions,

	
	// // SSR
	// hydrate(state, initialState) {
	// 	// console.log('initialState', initialState)
	// 	// console.log('state', state)
    //     if (initialState) {
    //         // Aqui você mescla o estado inicial com o estado atual
    //         // Este exemplo assume uma substituição simples. Você pode precisar
    //         // de uma lógica mais complexa dependendo do seu caso de uso.
    //         Object.assign(state, initialState);
    //     }
    // },

});



