import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';

export const useUsersStore = defineStore('users', {
	state: () => ({

		fieldConfigMandatory: [],
		// fieldConfigOptional: [],

		storeForm: false,
		editForm: false,

		formData: {},

		totalItems: 0,

		apiErrors: {},

		storeData: [],
		storeUsers: [],
		data: [],


	}),
	getters,
	actions,

});



