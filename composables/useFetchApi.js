// https://www.youtube.com/watch?v=zagHVAnuE58

import { ref } from 'vue';

export function fetchApi(endpoint, {
	baseUrl = "http://localhost/api/v1/",
	headers: customHeaders = {},
	method = 'GET',  // Por padrão, o método será GET
	body = null,  // Por padrão, não há corpo
	queryParams = {},
	...options
} = {}) {
	const data = ref(null);
	const error = ref(null);
	const loading = ref(true);
	const { signal, abort } = new AbortController();
	const defaultHeaders = {
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: "Bearer fdgsdfgjsiogjsdfoigjsdoigjsdoi",
	};
	const finalHeaders = { ...defaultHeaders, ...customHeaders };

	// Função para construir a string de consulta a partir dos parâmetros
	const buildQueryString = params => {
		const searchParams = new URLSearchParams();
	
		const addParam = (key, value) => {
			if (Array.isArray(value)) {
				value.forEach((item, index) => {
					if (typeof item === 'object' && item !== null) {
						Object.keys(item).forEach(subKey => {
							searchParams.append(`${key}[${index}][${subKey}]`, item[subKey]);
						});
					} else {
						searchParams.append(`${key}[]`, item);
					}
				});
			} else {
				searchParams.append(key, value);
			}
		};
	
		Object.keys(params).forEach(key => {
			addParam(key, params[key]);
		});
	
		return searchParams.toString();
	};
	

	const fetchData = async () => {
		const queryString = buildQueryString(queryParams);
		const requestOptions = {
			method,
			signal,
			headers: finalHeaders,
			...options
		};

		if (body) {
			requestOptions.body = JSON.stringify(body);
		}
		// console.log('requestOptions', requestOptions)
		try {
			const url = `${baseUrl}${endpoint}?${queryString}`;  // Inclui a string de consulta na URL
			const response = await fetch(url, requestOptions);

			data.value = await response.json();
		}
		catch (err) {	//Erro se o servidor não esta respondendo
			error.value = err.message;
		}
		finally {
			loading.value = false;
		}
	}

	return {
		data, error, loading, abort, fetchData,
	};
}

// method: O método HTTP (por exemplo, "GET", "POST", "PUT", "DELETE", etc.).
// headers: Qualquer cabeçalho que você queira adicionar ou sobrescrever.
// body: O corpo da requisição para métodos como POST ou PUT.
// mode: O modo da requisição (por exemplo, "cors", "no-cors", "same-origin", etc.).
// credentials: Indica se os cookies devem ser incluídos na requisição (por exemplo, "include", "omit", etc.).
// cache: Como a requisição deve ser tratada em relação ao cache.
// redirect: Como redirecionamentos devem ser tratados.
// signal: Associado com um AbortController para poder cancelar a requisição.

