import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';

export const useAuthenticationStore = defineStore('authentication', {
	state: () => ({

		token: null,
		user: null,
		tenants: [],
		tenantIds: [],
		apiErrors: {},
		isAuthenticated: false,
		logoutIsLoading: false,

	}),
	getters,
	actions,
	persist: true,	//Configuração necessária para armazenar o token nos cookies do navegador. Precisa instalar o módulo pinia-plugin-persistedstate 

	
});


