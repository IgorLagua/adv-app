import { defineStore } from 'pinia';
import { useCompaniesStore } from '~/stores/adm/companies'

export const useCnpjStore = defineStore('cnpj', {

	state: () => ({
		cnpjs: [],
		formData: {},
		apiErrors: {},
	}),

	actions: {
		async getCnpjAction(cnpjNumber) {

			

			// Limpar e formatar o CNPJ (removendo pontos, traços e barras)
			const cleanedCNPJ = formatCnpj(cnpjNumber);

			const existingCnpj = this.cnpjs.find(el => el.cnpj === cleanedCNPJ);

			if (existingCnpj) {
				this.formData = existingCnpj;
				this.apiErrors = existingCnpj.error ? existingCnpj.error : {};
				return; // Retorna se os dados já existem
			}

			else {

				const endpoint = cleanedCNPJ;
				const options = {
					baseUrl: "https://brasilapi.com.br/api/cnpj/v1/",
				};
				const { data, error } = await useApi(endpoint, options);

				if (data) {
					this.apiErrors = {}
					this.formData = data;
					this.cnpjs.push(data);
				}

				else {
					const companies = useCompaniesStore();
					this.apiErrors = error
					companies.apiErrors = error	
				}
			}
		},
	},
});





