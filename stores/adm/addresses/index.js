import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';

export const useAddressesStore = defineStore('addresses', {
	state: () => ({

		fieldConfig: [],

		formData: {
			// address: "Rua das Palmeiras",
			// number: 45,
			// complement: "Casa 2",
			// district: "Vila Nova",
			// city: "Rio de Janeiro",
			// state: "RJ",
			// zipCode: "22041-001",
		},

		apiErrors: {},

	}),
	getters,
	actions,

});



