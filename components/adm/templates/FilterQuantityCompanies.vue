<template>
    <v-autocomplete
        @update:modelValue="updateModel"
        @update:search="updateSearch"
        :items="companies.data"
        item-title="corporateName"
        item-value="cnpj"
        :loading="isLoading"
        label="Empresa"
        placeholder="Procure por razão social ou CNPJ"
        auto-select-first
        return-object
        :custom-filter="customFilter"
    >
        <template v-slot:item="{ props, item }">
            <v-list-item
                v-bind="props"
                :title="item?.raw['corporateName']"
                :subtitle="item?.raw['cnpj']"
            ></v-list-item>
        </template>
    </v-autocomplete>
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
        await companies.showApiAction(data.id);
        isLoading.value = false;
        emit("update", companies.formData);
    } else {
        emit("update");
    }
}

let timeoutId = null;

function updateSearch(queryText) {
    if (
        !queryText ||
        queryText === companySelected.value?.corporateName ||
        queryText === companySelected.value?.cnpj
    ) {
        return;
    } else {
        clearTimeout(timeoutId);
        isLoading.value = true;
        timeoutId = setTimeout(async () => {
            await companies.indexApiAction({
                search: queryText,
                columns: "id,corporateName,cnpj",
            });
            isLoading.value = false;
        }, 1000);
    }
}

function customFilter(itemTitle, queryText, item) {
    const corporateName = item.raw.corporateName.toLowerCase();
    const cnpj = item.raw.cnpj.toLowerCase();
    const searchText = queryText.toLowerCase();
    return corporateName.includes(searchText) || cnpj.includes(searchText);
}
</script>
