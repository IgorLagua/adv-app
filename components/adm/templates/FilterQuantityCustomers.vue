<template>
    <!-- {{ modelValue }} -->
    <!-- v-model="modelValue" -->
    <AdmCommonAutoCompleteServer
        @update:modelValue="updateModel"
        @update:search="updateSearch"
        :data="customers.dataAutoComplete"
        itemTitle="name"
		itemSubTitle="cpf"
        :loading="isLoading"
        label="Cliente"
        placeholder="Procure por nome ou CPF"
    ></AdmCommonAutoCompleteServer>

</template>


<script setup>
import { useCustomersStore } from "~/stores/adm/customers";
const customers = useCustomersStore();
const isLoading = ref(false);
const customerSelected = ref();

// onMounted(async () => {
//     await getCustomerItens();
// });

const emit = defineEmits(["update"]);

async function updateModel(data) {
    customerSelected.value = data;
    if (data?.id) {
		isLoading.value = true;
        await customers.showAutoCompleteApiAction(data.id);
		isLoading.value = false;
		emit("update", customers.formData);
    } else {
		// Se o usuário do sistema apagar o nome do campo autocomplete, apaga os tags tb. 
		emit("update");
	}
    // console.log("data", data);
}

let timeoutId = null; // Variável para armazenar o ID do timer

function updateSearch(queryText) {
    // console.log("queryText", queryText);

    // Verifica se não existe queryText ou se corresponde ao valor atual do customerSelected
    if (!queryText || queryText === customerSelected.value?.name) {
        return;
    } else {
        clearTimeout(timeoutId); // Cancela o timer anterior, se houver
        isLoading.value = true;
        // Configura um novo timer
        timeoutId = setTimeout(async () => {
            await customers.indexAutoCompleteApiAction({
                search: queryText,
                columns: "id,name,cpf",
            });
            isLoading.value = false;
        }, 1000); // Aguarda 1 segundo após o último evento de digitação
    }
}
</script>