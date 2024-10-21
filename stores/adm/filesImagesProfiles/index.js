import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';

export const useFilesImagesProfilesStore = defineStore('filesImagesProfiles', {
	state: () => ({

		formData: null,
		apiErrors: {},
		data: [],

	}),
	getters,
	actions,

});



