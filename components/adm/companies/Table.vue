<template>
    <div>
        <v-card flat class="mt-3">
            <v-card-title class="d-flex align-center pe-2">
                <v-btn @click="openForm('store')" color="blue">
                    Cadastrar
                </v-btn>

                <v-spacer></v-spacer>

                <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="Localizar por Nome, E-mail ou CNPJ sem caracteres"
                    flat
                    variant="solo-filled"
                >
                    <!-- :disabled="!search" -->
                    <template v-slot:append>
                        <v-btn @click="loadSearch" variant="tonal">
                            procurar
                        </v-btn>
                    </template>
                </v-text-field>
            </v-card-title>

            <v-data-table-server
                v-model:items-per-page="itemsPerPage"
                :search="searchTable"
                :headers="headers"
                :items="companies.data"
                :items-length="companies.totalItems"
                :loading="isLoading"
                class="elevation-2"
                :items-per-page-options="itemsPerPageOptions"
                items-per-page-text="Itens por página:"
                @update:options="loadItems"
            >
                <template v-slot:item.phones="{ value }">
                    <div v-for="(item, i) in value" :key="i">
                        {{ item.number }}
                    </div>
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-tooltip text="Editar" location="top">
                        <template v-slot:activator="{ props }">
                            <!-- <pre>{{ item }}</pre> -->
                            <v-icon
                                v-bind="props"
                                icon="mdi-pencil"
                                color="green"
                                class="me-2"
                                @click="openForm('update', item.id)"
                            ></v-icon>
                        </template>
                    </v-tooltip>

                    <v-tooltip text="Apagar" location="top">
                        <template v-slot:activator="{ props }">
                            <v-icon
                                v-bind="props"
								icon="mdi-trash-can-outline"
                                color="red"
                                @click="confirmDeleteItem(item)"
                            ></v-icon>
                        </template>
                    </v-tooltip>
                </template>
            </v-data-table-server>
        </v-card>

        <AdmCompaniesForm
            v-if="companies.openModalForm"
            :title="title"
            @update="updateSnackbar"
        />

        <AdmCommonDialogDeleteItem
            v-if="common.showDialogDelete"
            :name="itemSelected.corporateName"
            @update="deleteItem"
        ></AdmCommonDialogDeleteItem>

        <AdmCommonSnackbar
            v-if="showSnackbar"
            v-model="showSnackbar"
            :title="titleSnackbar"
            :subTitle="subTitleSnackbar"
            :color="colorSnackbar"
            :timeout="4000"
            :icon="iconSnackbar"
        ></AdmCommonSnackbar>
    </div>
</template>


<script setup>
import { useCompaniesStore } from "~/stores/adm/companies";
import { useCustomersStore } from '~/stores/adm/customers'
import { useCommonStore } from "~/stores/common";

const companies = useCompaniesStore();
const customers = useCustomersStore()
const common = useCommonStore();

const itemsPerPage = ref(10);

const headers = [
    { title: "Razão social", key: "corporateName" },
    { title: "CNPJ", key: "cnpj" },
    { title: "Telefone", sortable: false, key: "phones" },
    { title: "E-mail", key: "email" },
    { title: "Ações", align: "center", sortable: false, key: "actions" },
];

const itemsPerPageOptions = [
    { value: 10, title: "10" },
    { value: 25, title: "25" },
    { value: 50, title: "50" },
    { value: 100, title: "100" },
];

const title = ref(null);
async function openForm(type, id) {
    companies.formData = {};
    companies.formData.address = {};
	await customers.indexApiAction()
    if (type === "store") {
        title.value = "Cadastro Empresa";
    } else if (type === "update") {
        title.value = "Editar Empresa";
        showItem(id);
    }

    companies.openModalForm = true;
}

async function showItem(id) {
    companies.isLoading = true;
	// await sleep(3000)
	await companies.showApiAction(id);

	const customerId = companies.formData.customerId

	// Verifica se a empresa tem customerId
	// E se existe customerId em customers.data
	// Se não existe faz uma requisição para API e insere o retorno no customers.data
	if ( customerId ) {
		const exists = customers.data.some(customer => customer.id === customerId);
		
		if ( !exists ) {
			await customers.showApiAction(customerId);
			customers.data.push(customers.formData)
		}
	}
	companies.isLoading = false;
}

const isLoading = ref(false);
const search = ref("");
const searchTable = ref("");



// Carrega os dados inicialmente para SSR
// useAsyncData(() => {
//     // if (!companies.isLoaded) {
//         return indexItem({
//             page: 1,
//             itemsPerPage: itemsPerPage.value,
//             sortBy: [],
//             search: [],
//         });
//     // }
// });


function loadItems({ page, itemsPerPage, sortBy }) {
    isLoading.value = true;

    const paramsData = {
        page,
        itemsPerPage,
        sortBy,
        search: searchTable.value ? searchTable.value : [],
    };

    indexItem(paramsData);
}

async function indexItem(paramsData) {
    await companies.indexApiAction(paramsData);
    isLoading.value = false;
}

function loadSearch() {
    searchTable.value = search.value;
}

const showSnackbar = ref(false);
const titleSnackbar = ref(null);
const subTitleSnackbar = ref(null);
const colorSnackbar = ref(null);
const iconSnackbar = ref(null);
function updateSnackbar(step) {
    switch (step) {
        case 1:
            titleSnackbar.value = companies.formData.corporateName;
            break;
        case 2:
            titleSnackbar.value = "Endereço";
            break;
        case 3:
            titleSnackbar.value = "Telefones";
            break;
        case 4:
            titleSnackbar.value = "Dados opcionais";
            break;
    }

    subTitleSnackbar.value = "Cadastrado com sucesso";
    colorSnackbar.value = "green";
    iconSnackbar.value = "mdi-checkbox-marked-circle-outline";
    showSnackbar.value = true;
}

const itemSelected = ref(null);
function confirmDeleteItem(item) {
    common.showDialogDelete = true;
    itemSelected.value = item;
}

async function deleteItem() {
    isLoading.value = true;
	await companies.destroyApiAction(itemSelected.value.id);
    
	isLoading.value = false;
	showSnackbar.value = true;
	titleSnackbar.value = itemSelected.value.corporateName;
	subTitleSnackbar.value = "Apagado com sucesso";
	colorSnackbar.value = "red";
	iconSnackbar.value = "mdi-checkbox-marked-circle-outline";
}
</script>



