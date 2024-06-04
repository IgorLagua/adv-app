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
                    label="Localizar por Nome ou E-mail"
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
                :items="users.data"
                :items-length="users.totalItems"
                :loading="isLoading"
                class="elevation-2"
                :items-per-page-options="itemsPerPageOptions"
                items-per-page-text="Itens por página:"
                @update:options="loadItems"
            >

                <template v-slot:item.actions="{ item }">
                    <v-tooltip
                        text="Editar autorização do funcionário"
                        location="top"
                    >
                        <template v-slot:activator="{ props }">
                            <v-icon
                                v-bind="props"
                                icon="mdi-account-details"
                                color="blue"
                                class="me-2"
                                @click="openFormAuthorization(item)"
                            ></v-icon>
                        </template>
                    </v-tooltip>

                    <v-tooltip text="Editar funcionário" location="top">
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

        <AdmUsersForm
            v-if="openModalForm"
            v-model="openModalForm"
            :title="title"
        />

        <AdmUsersFormAuthorization
            v-if="openModalAuthorization"
            v-model="openModalAuthorization"
            :userData="userData"
        />

        <AdmCommonDialogDeleteItem
            v-if="common.showDialogDelete"
            :name="itemSelected.name"
            @update="deleteItem"
        ></AdmCommonDialogDeleteItem>

    </div>
</template>


<script setup>
import { useUsersStore } from "~/stores/adm/users";
import { useCommonStore } from "~/stores/common";
import { useSnackbarStore } from "~/stores/snackbar";

const users = useUsersStore();
const common = useCommonStore();
const snackbar = useSnackbarStore();

const itemsPerPage = ref(10);

const headers = [
    { title: "Nome", key: "name" },
    { title: "E-mail", key: "email" },
    { title: "Ações", align: "center", sortable: false, key: "actions" },
];

const itemsPerPageOptions = [
    { value: 5, title: "5" },
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

    // indexItem(paramsData);
    await users.indexApiAction(paramsData);
    isLoading.value = false;
}

function loadSearch() {
    searchTable.value = search.value;
}

const title = ref(null);
const openModalForm = ref(false);

function openForm(type, id) {
    users.formData = {};
    users.storeForm = false;
    users.editForm = false;

    if (type === "store") {
        users.storeForm = true;
        title.value = "Cadastro Funcionário";
    } else if (type === "update") {
        users.editForm = true;
        title.value = "Editar Funcionário";
        showItem(id);
    }
    openModalForm.value = true;
}

async function showItem(id) {
    users.isLoading = true;
    // console.log("id", id);
    await users.showApiAction(id);
    users.isLoading = false;
}

const userData = ref({});
const openModalAuthorization = ref(false);

function openFormAuthorization(item) {
    userData.value = item;
    openModalAuthorization.value = true;
}

const itemSelected = ref(null);
function confirmDeleteItem(item) {
    common.showDialogDelete = true;
    itemSelected.value = item;
}

async function deleteItem() {
    isLoading.value = true;

    await users.destroyApiAction(itemSelected.value.id);

    callSnackbar()

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


