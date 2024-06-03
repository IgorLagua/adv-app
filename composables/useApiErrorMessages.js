// import { watch } from 'vue';

export function useApiErrorMessages() {
    // const updateErrorMessages = (apiErrors, datas) => {
    //     for (const key in apiErrors) {
    //         const dataItem = datas.value.find(el => el.key === key);
    //         if (dataItem) {
    //             dataItem.errorMensages = apiErrors[key][0];
    //         }
    //     }
    // };

		const updateErrorMessages = (apiErrors, formData) => {
		// Itera sobre os campos do formulário.
		formData.forEach((data, index) => {
			// Verifica se existe um erro da API para o campo atual.
			if (apiErrors.errors[data.key]) {
				// Se houver, atribui a mensagem de erro ao campo correspondente.
				formData[index].errorMensages = apiErrors.errors[data.key];
			}
		});
	}

    // const clearErrorMessage = (formData, datas) => {
    //     // Monitora cada campo em formData
    //     for (const key in formData) {
    //         watch(() => formData[key], () => {
    //             const dataItem = datas.value.find(el => el.key === key);
	// 			// console.log('dataItem', dataItem);
    //             if (dataItem) {
    //                 dataItem.errorMensages = null;
    //             }
    //         });
    //     }
    // };

    return { updateErrorMessages/* , clearErrorMessage */ };
}
