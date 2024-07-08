<template>
    <div>
        <v-card flat class="mt-3">
            <v-card-title class="d-flex align-center pe-2">
                <v-btn
                    @click="openForm('store')"
                    color="blue"
                    v-if="hasPermission('customer', 'store')"
                >
                    Cadastrar
                </v-btn>

                <v-spacer></v-spacer>

                <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="Localizar por Nome, E-mail ou CPF sem caracteres"
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
                :items="customers.data"
                :items-length="customers.totalItems"
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
                    <v-tooltip
                        text="Editar"
                        location="top"
                        v-if="hasPermission('customer', 'update')"
                    >
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
                    
                    <v-tooltip
                        text="Apagar"
                        location="top"
                        v-if="hasPermission('customer', 'delete')"
                    >
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

        <AdmCustomersForm v-if="customers.openModalForm" :title="title" />

        <AdmCommonDialogDeleteItem
            v-if="common.showDialogDelete"
            :name="itemSelected.name"
            @update="deleteItem"
        ></AdmCommonDialogDeleteItem>
    </div>
</template>


<script setup>
import { useCustomersStore } from "~/stores/adm/customers";
import { useCommonStore } from "~/stores/common";
import { useSnackbarStore } from "~/stores/snackbar";

const customers = useCustomersStore();
const common = useCommonStore();
const snackbar = useSnackbarStore();

const itemsPerPage = ref(10);

const headers = [
    { title: "Nome", key: "name" },
    { title: "Telefone", sortable: false, key: "phones" },
    { title: "E-mail", key: "email" },
    { title: "CPF", key: "cpf" },
    { title: "Ações", align: "center", sortable: false, key: "actions" },
];

const itemsPerPageOptions = [
    { value: 10, title: "10" },
    { value: 25, title: "25" },
    { value: 50, title: "50" },
    { value: 100, title: "100" },
];

const title = ref(null);
function openForm(type, id) {
    customers.formData = {};
    customers.formData.address = {};
    if (type === "store") {
        title.value = "Cadastro Cliente";
    } else if (type === "update") {
        title.value = "Editar Cliente";
        showItem(id);
    }

    customers.openModalForm = true;
}

async function showItem(id) {
    customers.isLoading = true;
    // console.log("id", id);
    await customers.showApiAction(id);
    customers.isLoading = false;
}

const isLoading = ref(false);
const search = ref("");
const searchTable = ref("");

async function loadItems({ page, itemsPerPage, sortBy }) {
    isLoading.value = true;

    const paramsData = {
        page,
        itemsPerPage,
        sortBy,
        search: searchTable.value ? searchTable.value : [],
		columns: "id,name,cpf,email,phones",
    };
    await customers.indexApiAction(paramsData);
    isLoading.value = false;
}

function loadSearch() {
    searchTable.value = search.value;
}

const itemSelected = ref(null);
function confirmDeleteItem(item) {
    common.showDialogDelete = true;
    itemSelected.value = item;
}

async function deleteItem() {
    isLoading.value = true;
    await customers.destroyApiAction(itemSelected.value.id);
    isLoading.value = false;
    callSnackbar();
}

function callSnackbar() {
    snackbar.show = true;
    snackbar.title = itemSelected.value.name;
    snackbar.subTitle = "Apagado com sucesso";
    snackbar.color = "red";
    snackbar.timeout = 5000;
    snackbar.icon = "mdi-checkbox-marked-circle-outline";
}
</script>


