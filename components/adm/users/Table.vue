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
                :items="users.data"
                :items-length="users.totalItems"
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

                    <v-tooltip text="Editar autorização do funcionário" location="top">
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
import { useUsersStore } from "~/stores/adm/users";
import { useCommonStore } from "~/stores/common";

const users = useUsersStore();
const common = useCommonStore();

const itemsPerPage = ref(10);

const headers = [
    { title: "Nome", key: "name" },
    // { title: "Telefone", sortable: false, key: "phones" },
    { title: "E-mail", key: "email" },
    // { title: "CPF", key: "cpf" },
    { title: "Ações", align: "center", sortable: false, key: "actions" },
];

const itemsPerPageOptions = [
    { value: 10, title: "10" },
    { value: 25, title: "25" },
    { value: 50, title: "50" },
    { value: 100, title: "100" },
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
	users.storeForm = false
	users.editForm = false

    if (type === "store") {
		users.storeForm = true
        title.value = "Cadastro Funcionário";
    } else if (type === "update") {
		users.editForm = true
        title.value = "Editar Funcionário";
        showItem(id);
    }

    openModalForm.value = true;
}


const userData = ref({});
const openModalAuthorization = ref(false);

function openFormAuthorization(item) {
    userData.value = item;
    openModalAuthorization.value = true;
}

async function showItem(id) {
    users.isLoading = true;
    // console.log("id", id);
    await users.showApiAction(id);
    users.isLoading = false;
}






const showSnackbar = ref(false);
const titleSnackbar = ref(null);
const subTitleSnackbar = ref(null);
const colorSnackbar = ref(null);
const iconSnackbar = ref(null);
function updateSnackbar(step) {
    switch (step) {
        case 1:
            titleSnackbar.value = users.formData.name;
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
    await users.destroyApiAction(itemSelected.value.id);

    isLoading.value = false;
    showSnackbar.value = true;
    titleSnackbar.value = itemSelected.value.name;
    subTitleSnackbar.value = "Apagado com sucesso";
    colorSnackbar.value = "red";
    iconSnackbar.value = "mdi-checkbox-marked-circle-outline";
}
</script>


