<template>
    <div>
        <v-expansion-panels v-model="panel">
            <v-expansion-panel>
                <v-expansion-panel-title color="orange-lighten-5">
                    <h3>Seleção/Cadastros de Modelos</h3>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <v-col
                        cols="12"
                        sm="12"
                        lg="12"
                        xl="10"
                        xxl="8"
                        class="mt-3 pb-2"
                    >
                        <AdmTemplatesFilterAutoCompleteServer
                            v-model="templatesCategories.selected"
                            @update:modelValue="updateSelectCategory"
                            @update:search="categoryFilter"
                            @openDialog="openDialog('category')"
                            :data="templatesCategories.dataAutoComplete"
                            itemTitle="Categoria"
                            :loading="categoryIsLoading"
                            placeholder="Selecione uma Categoria"
                        >
                        </AdmTemplatesFilterAutoCompleteServer>
                    </v-col>

                    <v-col
                        cols="12"
                        sm="12"
                        lg="12"
                        xl="10"
                        xxl="8"
                        class="pt-2"
                    >
                        <AdmTemplatesFilterAutoCompleteServer
                            v-if="templatesCategories.selected"
                            v-model="templatesFiles.selected"
                            @update:modelValue="updateSelectFile"
                            @update:search="fileFilter"
                            @openDialog="openDialog('file')"
                            :data="templatesFiles.dataAutoComplete"
                            itemTitle="Modelo"
                            :loading="fileIsLoading"
                            placeholder="Selecione um Modelo"
                        ></AdmTemplatesFilterAutoCompleteServer>
                    </v-col>

                    <!-- :key="updateComponent" -->
                    <AdmTemplatesFilterQuantity
                        v-if="templates.showFilterQuantity"
                    />
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

        <AdmTemplatesDialog
            v-if="templates.showDialog"
            :title="title"
            @update="updateSelect"
        />
    </div>
</template>


<script setup>
import { useTemplatesStore } from "~/stores/adm/templates";
import { useTemplatesCategoriesStore } from "~/stores/adm/templatesCategories";
import { useTemplatesFilesStore } from "~/stores/adm/templatesFiles";

const templates = useTemplatesStore();
const templatesCategories = useTemplatesCategoriesStore();
const templatesFiles = useTemplatesFilesStore();

const panel = ref([0]);

onMounted(() => {
    if (templatesCategories.dataAutoComplete.length === 0) {
        getCategoriesItens();
    }
});

const categoryIsLoading = ref(false);
let timeoutId = null; // Variável para armazenar o ID do timer

async function categoryFilter(queryText) {
    // Verifica se queryText corresponde ao valor atual da Categoria
    if (queryText === templatesCategories.selected?.name) {
        return;
    }

    if (queryText) {
        clearTimeout(timeoutId); // Cancela o timer anterior, se houver
        categoryIsLoading.value = true;
        // Configura um novo timer
        timeoutId = setTimeout(() => {
            getCategoriesItens(queryText);
        }, 1000); // Aguarda 1 segundo após o último evento de digitação
    } else if (!templatesCategories.selected) {
        getCategoriesItens();
    }
}

async function getCategoriesItens(queryText) {
    categoryIsLoading.value = true;
    if (queryText) {
        // await sleep(3000)
        await templatesCategories.indexApiAction({ search: queryText });
    } else {
        // await sleep(3000)
        await templatesCategories.indexApiAction();
    }
    categoryIsLoading.value = false;
}

function updateSelect() {
    if (title.value === "Categorias") {
        updateSelectCategory();
    }
    if (title.value === "Modelo") {
        updateSelectFile();
    }
}

function updateSelectCategory() {
    if (!templatesCategories.selected) {
        getCategoriesItens();
    } else {
        templates.selectedTable[0] = templatesCategories.selected;
        getFilesItens();
    }
    templatesFiles.selected = null;
    templatesFiles.content = "";
    templates.showEditor = false;
    templates.showFilterQuantity = false;
}

const fileIsLoading = ref(false);
// let timeoutId = null; // Variável para armazenar o ID do timer

async function fileFilter(queryText) {
    // Verifica se queryText corresponde ao valor atual da Categoria
    if (queryText === templatesFiles.selected?.name) {
        return;
    }

    if (queryText) {
        clearTimeout(timeoutId); // Cancela o timer anterior, se houver
        fileIsLoading.value = true;
        // Configura um novo timer
        timeoutId = setTimeout(() => {
            getFilesItens(queryText);
        }, 1000); // Aguarda 1 segundo após o último evento de digitação
    } else if (!templatesFiles.selected) {
        getFilesItens();
    }
}

async function getFilesItens(queryText) {
    // console.log('queryText', queryText)
    fileIsLoading.value = true;
    if (queryText) {
        const paramsData = {
            template_categories_id: templatesCategories.selected.id,
            search: queryText,
        };
        await templatesFiles.indexApiAction(paramsData);
    } else {
        const paramsData = {
            template_categories_id: templatesCategories.selected.id,
        };
        await templatesFiles.indexApiAction(paramsData);
    }
    // await sleep(3000)
    fileIsLoading.value = false;
}

async function updateSelectFile() {
    if (templatesFiles.selected) {
        fileIsLoading.value = true;
        templates.showFilterQuantity = false;
        templates.showEditor = false;
        await templatesFiles.showApiAction(templatesFiles.selected.id);
        templates.showFilterQuantity = true;
        templates.showEditor = true;
        templatesFiles.content = templatesFiles.selected.content;
        templates.selectedTable[0] = templatesFiles.selected;
        templatesFiles.selected.peopleSelected = [];
        templatesFiles.selected.companiesSelected = [];
        // updateComponent.value++; // Isso irá "reiniciar" o componente v-sheet quando o método for chamado para limpar o conteúdo do AdmCustomersFilter
        // templates.showButtonsEditor = false;
        fileIsLoading.value = false;
    } else {
        templates.showEditor = false;
        templates.showFilterQuantity = false;
    }
}

const title = ref(null);

function openDialog(dialog) {
    if (dialog === "category") {
        templates.nameDialog = "Categoria";
        title.value = "Categorias";
        if (!templatesCategories.selected) {
            templates.selectedTable = [];
        }
    }
    if (dialog === "file") {
        templates.nameDialog = "Modelo";
        title.value = "Modelo";
    }
    templates.showDialog = true;
}
</script>


