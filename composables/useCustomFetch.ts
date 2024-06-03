import type { UseFetchOptions } from '#app'
import { defu } from 'defu'

export function useCustomFetch<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
	const userAuth = useCookie('token')
	const config = useRuntimeConfig()

	const defaults: UseFetchOptions<T> = {
		baseURL: config.baseUrl ?? 'http://localhost/api/v1/',
		method: config.method ?? 'GET',
		key: url,

		// set user token if connected
		headers: userAuth.value
			? { Authorization: `Bearer ${userAuth.value}` }
			: {},

		// Inclui os parâmetros de consulta na URL
		...options.query && {
			query: (() => {
				let queryParams = {};
				Object.keys(options.query).forEach(key => {
					const value = options.query[key];
					queryParams[key] = value;
				});
				return queryParams;
			})()
		},

		onResponse(_ctx) {
			// _ctx.response._data = new myBusinessResponse(_ctx.response._data)
		},

		onResponseError(_ctx) {
			// throw new myBusinessError()
		}
	}

	// for nice deep defaults, please use unjs/defu
	const params = defu(options, defaults)

	// console.log('url', url)
	// console.log('params', params)
	return useFetch(url, params)


}
