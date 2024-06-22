import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';

export const useClassEntitiesStore = defineStore('classEntities', {
	state: () => ({

		formData: [
			{
				number: null,
				type: null,
				state: null
			}
		],
		data: [],
		apiErrors: {},

	}),
	getters,
	actions,

});



