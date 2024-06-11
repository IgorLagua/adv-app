import { defineStore } from 'pinia';

export const useZipCodeStore = defineStore('zipCode', {
	state: () => ({
		addresses: [],
		formData: {},
		apiErrors: {},
	}),

	actions: {
		async getZipCodeAction(zipCodeNumber) {
			// Limpar e formatar o CEP (removendo o traço) - não precisa, pois a API aceita com o traço 
			// const cleanedZipCode = formatZipCode(cnpjNumber);

			const existingZipCode = this.addresses.find(el => el.cep === zipCodeNumber);

			if (existingZipCode) {
				this.formData = existingZipCode;
				this.apiErrors = existingZipCode.error ? existingZipCode.error : {};
				return; // Retorna se os dados já existem
			}

			else {

				

				const endpoint = `${zipCodeNumber}/json/`;
				const baseUrl = "https://viacep.com.br/ws/";

				// Preparar a URL com os parâmetros de query
				let url = new URL(endpoint, baseUrl);

				// const { data, errorValue } = await useApi(endpoint, options);
				let data = await $fetch(url.href);

				if (data) {
					this.apiErrors = {}
					this.formData = data;
					this.addresses.push(data);
				}

				else {

					this.apiErrors = errorValue

					this.formData = { zipCode: cleanedZipCode };
					this.addresses.push({
						zipCode: cleanedZipCode,
						error: errorValue
					});

				}
			}

			// if (!existingZipCode) {
			//     try {

			//         const { data, error, loading, fetchData} = fetchApi(`${zipCodeNumber}/json/`, {
			//             baseUrl: "https://viacep.com.br/ws/"
			//         })
			//         await fetchData()

			//         if ( data.value ) {
			//             this.formData = data.value;
			//             this.addresses.push(data.value);
			//         } else {
			//             this.formData = {zipCode: cleanedZipCode};
			//             this.addresses.push({zipCode: cleanedZipCode});
			//         }
			//     } catch (error) {
			//         console.error('There was a problem fetching the zipCode:', error);
			//     }
			// } else {
			//     this.formData = existingZipCode;
			// }
		},
	},
});


