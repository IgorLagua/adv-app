import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';

export const useFilesStore = defineStore('files', {
	state: () => ({

		// openModalForm: false,		
		// isLoading: false,
		
		formData: null,

		// totalItems: 0,

		apiErrors: {},
		
		// storeData: [],
		data: [],

	}),
	getters,
	actions,

});



