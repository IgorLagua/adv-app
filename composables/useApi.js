
import { useAuthenticationStore } from "~/stores/site/authentication";

export async function useApi(endpoint, options = {}) {

	const authentication = useAuthenticationStore();

	// const authentication = useCookie('authentication')	//Pega o cookies do usuario autenticado

	let data = null
	let error = null

	// Configurações padrão para o useFetch
	const defaultOptions = {
		// baseUrl: 'http://localhost/api/v1/', // Valor padrão para baseUrl
		baseUrl: 'https://api.iasapp.com.br/api/v1/', // Valor padrão para baseUrl
		method: 'GET', // Por padrão, o método será GET
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			// 'Authorization': authentication.value?.token ? `Bearer ${authentication.value.token}` : null,
			// 'tenantIds': authentication.value?.tenantIds,
			'Authorization': authentication.token ? `Bearer ${authentication.token}` : null,
			'tenantIds': authentication.tenantIds,

		},
		...options, // Mesclar opções passadas com as configurações padrão
		// onResponseError({ response }) {
		// 	errorValue = response._data;
		// },
	};

	// Preparar a URL com os parâmetros de query
	let url = new URL(endpoint, defaultOptions.baseUrl);

	try {
		// Tente fazer a chamada com $fetch
		data = await $fetch(url.href, defaultOptions);
		// status = true
		// Se a chamada for bem-sucedida, processe os dados
		// console.log('Dados recebidos:', data);
	} catch (errors) {

		// console.log('errors', errors.response);

		// Verifica se a resposta está disponível e é um erro 422
		// if (errors.response && errors.response.status === 422) {
		// 	// Trate especificamente o erro 422
		// 	errorValue = errors.response._data
		// 	// console.log('Erro 422: Dados inválidos fornecidos.', errors.response._data);
		// } else {
		error = errors.response._data
		// Trate outros erros
		// console.log('Erro ao fazer a requisição:', errors);
		// }


		if (error.message === 'Unauthenticated.') {
			authentication.isAuthenticated = false
		}
	}

	// Retornar os resultados e métodos de controle
	return { data, error/*, errorValue , status */ };
};



