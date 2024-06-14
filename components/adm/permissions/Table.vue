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
                :items="permissions.data"
                :items-length="permissions.totalItems"
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
                                @click="openForm('update', item)"
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

        <AdmPermissionsForm
			v-if="openModalForm"
            v-model="openModalForm"
            :title="title"
        />

        <AdmCommonDialogDeleteItem
            v-if="common.showDialogDelete"
            :name="itemSelected.name"
            @update="deleteItem"
        ></AdmCommonDialogDeleteItem>

    </div>
</template>


<script setup>
import { usePermissionsStore } from "~/stores/adm/permissions";
import { useCommonStore } from "~/stores/common";
import { useSnackbarStore } from "~/stores/snackbar";

const permissions = usePermissionsStore();
const common = useCommonStore();
const snackbar = useSnackbarStore();

const itemsPerPage = ref(10);

const headers = [
    { title: "ID", key: "id" },
    { title: "Nome", key: "name" },
	{ title: "Descrição", key: "description" },
    { title: "Ações", align: "center", sortable: false, key: "actions" },
];

const itemsPerPageOptions = [
    { value: 10, title: "10" },
    { value: 25, title: "25" },
    { value: 50, title: "50" },
];


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
    };

    await permissions.indexApiAction(paramsData);
    isLoading.value = false;
}

function loadSearch() {
    searchTable.value = search.value;
}

const title = ref(null);
const openModalForm = ref(false);

function openForm(type, itens) {
    permissions.formData = {};
    permissions.storeForm = false;
    permissions.editForm = false;

    if (type === "store") {
		permissions.storeForm = true;
        title.value = "Cadastro Permissão";
    } else if (type === "update") {
        title.value = "Editar Permissão";
        permissions.editForm = true;
        permissions.formData = itens;
    }
    openModalForm.value = true;
}

const itemSelected = ref(null);
function confirmDeleteItem(item) {
    common.showDialogDelete = true;
    itemSelected.value = item;
}

async function deleteItem() {
    isLoading.value = true;
    await permissions.destroyApiAction(itemSelected.value.id);
	callSnackbar();
    isLoading.value = false;
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


