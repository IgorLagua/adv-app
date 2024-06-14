import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';

export const useResourcesPermissionsStore = defineStore('resourcesPermissions', {
	state: () => ({

		// formData: {},
		storeForm: false,
		editForm: false,

		// totalItems: 0,

		apiErrors: {},
		
		storeData: [],
		data: [],

	}),
	getters,
	actions,

});



