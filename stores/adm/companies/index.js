import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';

export const useCompaniesStore = defineStore('companies', {
	state: () => ({

		openModalForm: false,
		// isLoading: false,

		formData: {},

		legalRepresentatives: [],	// Quando carrega a empresa via Show, create ou update. Carega os valores dos representantes legais nessa variavel

		totalItems: 0,

		apiErrors: {},
		storeData: [],

		data: [],

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



