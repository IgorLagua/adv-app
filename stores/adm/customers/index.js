import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';

export const useCustomersStore = defineStore('customers', {
	state: () => ({

		openModalForm: false,		
		isLoading: false,
		
		formData: {},

		totalItems: 0,

		apiErrors: {},
		
		storeData: [],
		data: [],

	}),
	getters,
	actions,

});



