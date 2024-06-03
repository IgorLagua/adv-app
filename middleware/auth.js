import { useAuthenticationStore } from "~/stores/site/authentication";

export default defineNuxtRouteMiddleware((to, from) => {

	const authentication = useAuthenticationStore();

	// console.log('authentication.token', authentication.token);
	
	if (!authentication.token) {
		return navigateTo("/site/login")
	}
	
  })