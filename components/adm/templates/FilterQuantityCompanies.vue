<template>

    <AdmCommonAutoCompleteServer
        @update:modelValue="updateModel"
        @update:search="updateSearch"
        :data="companies.dataAutoComplete"
        itemTitle="fantasyName"
        itemSubTitle="cnpj"
        :loading="isLoading"
        label="Empresa"
        placeholder="Procure por nome ou CNPJ"
    ></AdmCommonAutoCompleteServer>

</template>


<script setup>
import { useCompaniesStore } from "~/stores/adm/companies";
const companies = useCompaniesStore();
const isLoading = ref(false);
const companySelected = ref();

const emit = defineEmits(["update"]);

async function updateModel(data) {
    companySelected.value = data;
    if (data?.id) {
		isLoading.value = true;
        await companies.showAutoCompleteApiAction(data.id);
		isLoading.value = false;
		emit("update", companies.formData);
    } else {
		// Se o usuário do sistema apagar o nome do campo autocomplete, apaga os tags tb. 
		emit("update");
	}
}

let timeoutId = null; // Variável para armazenar o ID do timer

function updateSearch(queryText) {

    // Verifica se não existe queryText ou se corresponde ao valor atual do companySelected
    if (!queryText || queryText === companySelected.value?.name) {
        return;
    } else {
        clearTimeout(timeoutId); // Cancela o timer anterior, se houver
        isLoading.value = true;
        // Configura um novo timer
        timeoutId = setTimeout(async () => {
            await companies.indexAutoCompleteApiAction({
                search: queryText,
                columns: "id,fantasyName,cnpj",
            });
            isLoading.value = false;
        }, 1000); // Aguarda 1 segundo após o último evento de digitação
    }
}
</script>