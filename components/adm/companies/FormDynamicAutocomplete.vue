<template>
    <v-card  elevation="2" class="mx-1 mt-6  mb-2">
        <v-card-text class="mt-2" >
            <v-row v-for="(row, rowIndex) in customerIds" :key="rowIndex">
                <v-col cols="8">
                    <v-autocomplete
                        label="Represente legal"
                        :items="customers.data"
                        item-title="name"
                        item-value="id"
                        :loading="isLoading"
                        @update:search="updateSearch"
                        @update:focused="firstAccess"
                        v-model="customerIds[rowIndex]"
                        auto-select-first
                        :custom-filter="customFilter"
                    >
                        <template v-slot:item="{ props, item }">
                            <v-list-item
                                v-bind="props"
                                :title="item?.raw?.name"
                                :subtitle="item?.raw?.cpf"
                            ></v-list-item>
                        </template>

                        <template v-slot:append>
                            <v-btn
                                v-if="rowIndex === 0"
                                @click="addRow"
                            >
                                Adicionar
                            </v-btn>
                            <v-btn
                                v-else
                                @click="removeRow(rowIndex)"
                            >
                                Remover
                            </v-btn>
                        </template>
                    </v-autocomplete>
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-actions>
            <v-btn
                color="blue"
                variant="tonal"
                @click="openCustomerForm"
                class="ml-2 mb-2"
                >Cadastrar representante</v-btn
            >
        </v-card-actions>
        
    </v-card>
    
    <AdmCustomersForm
        v-if="customers.openModalForm"
        title="Cadastro Cliente"
        
    />
</template>
  
<script setup>
import { useCustomersStore } from "~/stores/adm/customers";
const customers = useCustomersStore();
const isLoading = ref(false);
const customerIds = defineModel(); //https://www.youtube.com/watch?v=u4Z7Cc8AUck


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

let timeoutId = null; // Variável para armazenar o ID do timer
async function updateSearch(queryText) {
    if (!queryText) {
        return;
    }
    if (queryText) {
        clearTimeout(timeoutId); // Cancela o timer anterior, se houver
        isLoading.value = true;

        // Configura um novo timer
        timeoutId = setTimeout(async () => {
            // Tornar a função dentro do setTimeout assíncrona
            await customers.indexApiAction({ 
				search: queryText,
				columns: "id,name,cpf"
			});
            isLoading.value = false;
        }, 1000); // Aguarda 1 segundo após o último evento de digitação
    }
}

function openCustomerForm() {
    customers.formData = {};
    customers.formData.address = {};
    customers.openModalForm = true;
}

function customFilter(itemTitle, queryText, item) {
    const name = item.raw.name.toLowerCase();
    const cpf = item.raw.cpf.toLowerCase();
    const searchText = queryText.toLowerCase();
    return name.includes(searchText) || cpf.includes(searchText);
}

function addRow() {
    customerIds.value.push(null);
}

function removeRow(rowIndex) {
    customerIds.value.splice(rowIndex, 1);
}
</script>