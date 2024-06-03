<template>
    <div>
        <v-card>
            <v-card-title class="d-flex align-center pe-2">
                <v-btn @click="openForm('store')" color="blue">
                    Cadastrar
                </v-btn>

                <v-spacer></v-spacer>

                <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="Localizar"
                    flat
                    variant="solo-filled"
                >
                    <template v-slot:append>
                        <v-btn @click="loadSearch" variant="tonal">
                            procurar
                        </v-btn>
                    </template>
                </v-text-field>
            </v-card-title>

            <v-data-table-server
                v-model:items-per-page="itemsPerPage"
                v-model="templates.selectedTable"
                @update:modelValue="updateSelect"
                @update:options="loadItems"
                :search="searchTable"
                :headers="headers"
                :items="items.dataTable"
                :items-length="items.length"
                :loading="isLoading"
                class="elevation-2"
                :items-per-page-options="itemsPerPageOptions"
                items-per-page-text="Itens por página:"
                return-object
                select-strategy="single"
                show-select
                height="320"
            >
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

        <AdmTemplatesDialogTableForm
            v-if="templates.openModalForm"
            :title="titleForm + templates.nameDialog"
            @update="updateSnackbar"
			/>

        <AdmCommonDialogDeleteItem
            v-if="common.showDialogDelete"
            :name="itemDelete.name"
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
import { useTemplatesStore } from "~/stores/adm/templates";
import { useTemplatesCategoriesStore } from "~/stores/adm/templatesCategories";
import { useCommonStore } from "~/stores/common";
import { useTemplatesFilesStore } from "~/stores/adm/templatesFiles";

const templates = useTemplatesStore();
const templatesCategories = useTemplatesCategoriesStore();
const templatesFiles = useTemplatesFilesStore();
const common = useCommonStore();

const itemsPerPage = ref(5);
const isLoading = ref(false);
const search = ref("");
const searchTable = ref("");
const itemsPerPageOptions = [
    { value: 5, title: "5" },
    { value: 10, title: "10" },
    { value: 20, title: "20" },
];

const headers = [
    { title: templates.nameDialog, align: "start", key: "name" },
    { title: "Ações", align: "center", sortable: false, key: "actions" },
];

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
    // await sleep(3000)

    if (templates.nameDialog === "Categoria") {
        await templatesCategories.indexApiAction(paramsData);
    }
    if (templates.nameDialog === "Modelo") {
        paramsData.template_categories_id = templatesCategories.selected.id;
        await templatesFiles.indexApiAction(paramsData);
    }

    isLoading.value = false;
}

function loadSearch() {
    searchTable.value = search.value;
}

const items = computed(() => {
    let data = {
        dataTable: null,
        length: 0,
    };

    if (templates.nameDialog === "Categoria") {
        data.dataTable = templatesCategories.dataTable;
        data.length = templatesCategories.totalItems;
    } else if (templates.nameDialog === "Modelo") {
        data.dataTable = templatesFiles.dataTable;
        data.length = templatesFiles.totalItems;
    }

    return data;
});

onMounted(() => {
    if (templates.nameDialog === "Categoria") {
        if (templatesCategories.selected) {
            templates.selectedTable[0] = templatesCategories.selected;
        }
    }

    if (templates.nameDialog === "Modelo") {
        if (templatesFiles.selected) {
            templates.selectedTable[0] = templatesFiles.selected;
        }
    }
});

const emit = defineEmits(["update"]);

function updateSelect(item) {
    emit("update", item[0]);
}

const titleForm = ref(null);
function openForm(type, item) {
    if (type === "store") {
        templates.storeForm = true;
        titleForm.value = "Cadastrar ";
        templates.formData = {};
    } else if (type === "update") {
        templates.editForm = true;
        titleForm.value = "Editar ";
        templates.formData = { ...item };
    }

    templates.openModalForm = true;
}

const showSnackbar = ref(false);
const titleSnackbar = ref(null);
const subTitleSnackbar = ref(null);
const colorSnackbar = ref(null);
const iconSnackbar = ref(null);
function updateSnackbar(type, name) {
    // if (Object.keys(templatesCategories.apiErrors).length === 0) {
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
    // } else {
    //     // Obtenha a primeira chave do objeto apiErrors
    //     let firstKey = Object.keys(templatesCategories.apiErrors)[0];

    //     // Acesse o primeiro item do array dessa chave
    //     let firstErrorMessage = templatesCategories.apiErrors[firstKey][0];

    //     // if (type === "store" || "edit") {
    //     if (type === "store") {
    //         titleSnackbar.value = "Erro no cadastro";
    //         subTitleSnackbar.value = firstErrorMessage;
    //     }
    //     if (type === "edit") {
    //         titleSnackbar.value = "Erro na edição";
    //         subTitleSnackbar.value = "Editado com sucesso";
    //     }
    //     colorSnackbar.value = "red";
    //     iconSnackbar.value = "mdi-alert";
    //     // }
    // }

    showSnackbar.value = true;
}

const itemDelete = ref(null);

const confirmDeleteItem = (item) => {
    itemDelete.value = item;
    common.showDialogDelete = true;
};

async function deleteItem() {
    isLoading.value = true;

    await templatesCategories.destroyApiAction(itemDelete.value.id);

    isLoading.value = false;
    showSnackbar.value = true;
    titleSnackbar.value = itemDelete.value.name;
    subTitleSnackbar.value = "Apagado com sucesso";
    colorSnackbar.value = "red";
    iconSnackbar.value = "mdi-checkbox-marked-circle-outline";
}
</script>