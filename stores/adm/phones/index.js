import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';

export const usePhonesStore = defineStore('phones', {
	state: () => ({

		formData: [
			// {
			// 	number: "(21) 97654-3210",
			// 	types: [
			// 		{
			// 			type: "WhatsApp"
			// 		},
			// 		{
			// 			type: "Celular"
			// 		},
			// 	]
			// },
			// {
			// 	number: "(21) 2345-6789",
			// 	types: [
			// 		{
			// 			type: "Residencial"
			// 		},
			// 		{
			// 			type: "Celular"
			// 		},
			// 	]
			// }
		],
		

		apiErrors: {},

	}),
	getters,
	actions,

});



