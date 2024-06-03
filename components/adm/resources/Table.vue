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
                :items="resources.data"
                :items-length="resources.totalItems"
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

        <AdmResourcesForm
            v-model="openModalForm"
            :title="title"
            @update="updateSnackbar"
        />

        <AdmCommonDialogDeleteItem
            v-if="common.showDialogDelete"
            :name="itemSelected.name"
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
import { useResourcesStore } from "~/stores/adm/resources";
import { useCommonStore } from "~/stores/common";

const resources = useResourcesStore();
const common = useCommonStore();

const itemsPerPage = ref(10);

const headers = [
    { title: "Nome", key: "name" },
    { title: "Ações", align: "center", sortable: false, key: "actions" },
];

const itemsPerPageOptions = [
    { value: 10, title: "10" },
    { value: 25, title: "25" },
    { value: 50, title: "50" },
];

const title = ref(null);
const openModalForm = ref(false);

function openForm(type, itens) {
    resources.formData = {};
    resources.formData.address = {};
    if (type === "store") {
        title.value = "Cadastro Recurso";
        resources.storeForm = true;
    } else if (type === "update") {
        title.value = "Editar Recurso";
        resources.editForm = true;
        resources.formData = itens;
    }
    openModalForm.value = true;
}

const isLoading = ref(false);
const search = ref("");
const searchTable = ref("");

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
    await resources.indexApiAction(paramsData);
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

function updateSnackbar(type, name) {
    if (type === "store" || "edit") {
        titleSnackbar.value = name;
        if (type === "store") {
            subTitleSnackbar.value = "Cadastrado com sucesso";
        }
        if (type === "edit") {
            subTitleSnackbar.value = "Editado com sucesso";
        }
        colorSnackbar.value = "green";
        iconSnackbar.value = "mdi-checkbox-marked-circle-outline";
    }
    showSnackbar.value = true;
}

const itemSelected = ref(null);
function confirmDeleteItem(item) {
    common.showDialogDelete = true;
    itemSelected.value = item;
}

async function deleteItem() {
    isLoading.value = true;
    await resources.destroyApiAction(itemSelected.value.id);

    isLoading.value = false;
    showSnackbar.value = true;
    titleSnackbar.value = itemSelected.value.name;
    subTitleSnackbar.value = "Apagado com sucesso";
    colorSnackbar.value = "red";
    iconSnackbar.value = "mdi-checkbox-marked-circle-outline";
}
</script>


