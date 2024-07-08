<template>
    <v-autocomplete
        @update:modelValue="updateModel"
        @update:search="updateSearch"
		@update:focused="firstAccess"
        :items="customers.data"
        item-title="name"
        item-value="cpf"
        :loading="isLoading"
        label="Cliente"
        placeholder="Procure por nome ou CPF"
        auto-select-first
        return-object
        :custom-filter="customFilter"
    >
        <template v-slot:item="{ props, item }">
            <v-list-item
                v-bind="props"
                :title="item?.raw['name']"
                :subtitle="item?.raw['cpf']"
            ></v-list-item>
        </template>
    </v-autocomplete>
</template>

<script setup>
import { useCustomersStore } from "~/stores/adm/customers";

const customers = useCustomersStore();
const isLoading = ref(false);
const customerSelected = ref();

const emit = defineEmits(["update"]);

async function firstAccess() {
    if (customers.data.length === 0) {
		isLoading.value = true;
        await customers.indexApiAction({
            itemsPerPage: 10,
            columns: "id,name,cpf",
        });
		isLoading.value = false;
    }
}

let timeoutId = null;

async function updateSearch(queryText) {
    if (!queryText || queryText === customerSelected.value?.name) {
        return;
    } else {
        clearTimeout(timeoutId);
        isLoading.value = true;
        timeoutId = setTimeout(async () => {
            await customers.indexApiAction({
                search: queryText,
                columns: "id,name,cpf",
            });
            isLoading.value = false;
        }, 1000);
    }
}

async function updateModel(data) {
    customerSelected.value = data;
    if (data?.id) {
        isLoading.value = true;
        await customers.showApiAction(data.id);
        isLoading.value = false;
        emit("update", customers.formData);
    } else {
        emit("update");
    }
}


function customFilter(itemTitle, queryText, item) {
    const name = item.raw.name.toLowerCase();
    const cpf = item.raw.cpf.toLowerCase();
    const searchText = queryText.toLowerCase();
    return name.includes(searchText) || cpf.includes(searchText);
}
</script>