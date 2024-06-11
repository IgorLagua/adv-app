<template>
    <v-dialog v-model="templates.openModalForm" max-width="600">
        <v-card>
            <v-alert color="orange-lighten-5">
                <h3>{{ title }}</h3>
            </v-alert>

            <v-form v-model="isValid">
                <v-card-text class="pb-0">
                    <v-col v-for="data in datas" :key="data.label">
                        <AdmCommonFormDefault
                            :data="data"
                            v-model="templates.formData[data.key]"
                        />
                    </v-col>
                </v-card-text>

                <v-card-actions class="mr-5 mb-2 pt">
                    <v-spacer></v-spacer>

                    <v-btn min-width="100" variant="tonal" @click="clearForm">
                        Limpar
                    </v-btn>
                    <v-btn min-width="100" variant="tonal" @click="closeForm">
                        Fechar
                    </v-btn>
                    <!-- :disabled="!templatesCategories.selected" -->
                    <v-btn
                        color="blue-darken-1"
                        min-width="100"
                        variant="flat"
                        :disabled="!isValid"
                        :loading="isLoading"
                        @click="saveButton"
                    >
                        Salvar
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { useTemplatesStore } from "~/stores/adm/templates";
import { useTemplatesCategoriesStore } from "~/stores/adm/templatesCategories";
import { useTemplatesFilesStore } from "~/stores/adm/templatesFiles";
import { useSnackbarStore } from "~/stores/snackbar";


const templates = useTemplatesStore();
const templatesCategories = useTemplatesCategoriesStore();
const templatesFiles = useTemplatesFilesStore();
const snackbar = useSnackbarStore();


const isLoading = ref(false);

const props = defineProps({
    title: { type: String, required: false },
});

const isValid = ref(false);

// Validações dos inputs --> vem da pasta composables
const { requiredValidation, minLengthValidation, maxLengthValidation } =
    useValidation();

const datas = ref([
    {
        type: "textArea",
        label: templates.nameDialog,
        errorMensages: null,
        rules: [
            requiredValidation({ name: templates.nameDialog }),
            minLengthValidation({ name: templates.nameDialog, number: 2 }),
            maxLengthValidation({ name: templates.nameDialog, number: 255 }),
        ],
        key: "name",
    },
    // {
    // 	type: "textArea",
    // 	label: "Descrição",
    // 	errorMensages: null,
    // 	rules: [
    // 		minLengthValidation({ name: "A descrição", number: 2 }),
    // 		maxLengthValidation({ name: "A descrição", number: 255 }),
    // 	],
    // 	key: "description",
    // },
]);

const { updateErrorMessages } = useApiErrorMessages();

// async function saveButton() {
//     if (isValid.value) {
//         isLoading.value = true;

//         if (templates.storeForm) {
//             if (templates.nameDialog === "Categoria") {
//                 await templatesCategories.storeApiAction({
//                     ...templates.formData,
//                 });

//                 if (Object.keys(templatesCategories.apiErrors).length === 0) {
//                     emit("update", "store", templates.formData.name);
//                 } else {
//                     // Se existe erro no retorno da API
//                     // Atualizar mensagens de erro nos inputs com base nos erros da API
//                     updateErrorMessages(
//                         templatesCategories.apiErrors,
//                         datas.value
//                     );
//                     isLoading.value = false;
//                     return;
//                 }
//             } else if (templates.nameDialog === "Modelo") {
//                 templates.formData.template_categories_id = templatesCategories.selected.id
                
// 				await templatesFiles.storeApiAction({
//                     ...templates.formData,
//                 });

//                 if (Object.keys(templatesFiles.apiErrors).length === 0) {
//                     emit("update", "store", templates.formData.name);
//                 } else {
//                     // Se existe erro no retorno da API
//                     // Atualizar mensagens de erro nos inputs com base nos erros da API
//                     updateErrorMessages(templatesFiles.apiErrors, datas.value);
//                     isLoading.value = false;
//                     return;
//                 }
//             }
//         } else if (templates.editForm) {
//             if (templates.nameDialog === "Categoria") {
//                 await templatesCategories.updateApiAction({
//                     ...templates.formData,
//                 });

//                 if (Object.keys(templatesCategories.apiErrors).length === 0) {
//                     emit("update", "edit", templates.formData.name);
//                 } else {
//                     // se existe erro no retorno da API
//                     // Atualizar mensagens de erro nos inputs com base nos erros da API
//                     updateErrorMessages(
//                         templatesCategories.apiErrors,
//                         datas.value
//                     );
//                     isLoading.value = false;
//                     return;
//                 }
//             } else if (templates.nameDialog === "Modelo") {
// 				templates.formData.template_categories_id = templatesCategories.selected.id
				
//                 await templatesFiles.updateApiAction({
//                     ...templates.formData,
//                 });

//                 if (Object.keys(templatesFiles.apiErrors).length === 0) {
//                     emit("update", "edit", templates.formData.name);
//                 } else {
//                     // se existe erro no retorno da API
//                     // Atualizar mensagens de erro nos inputs com base nos erros da API
//                     updateErrorMessages(
//                         templatesFiles.apiErrors,
//                         datas.value
//                     );
//                     isLoading.value = false;
//                     return;
//                 }
//             }
//         }

//         isLoading.value = false;

//         closeForm();
//         clearForm();
//     }
// }


async function saveButton() {
    // Verifica se o formulário é válido
    if (!isValid.value) return;

    // Define o estado de carregamento como verdadeiro
    isLoading.value = true;

    // Declaração das variáveis para a ação da API e erros da API
    let apiAction, apiErrors;

    // Verifica se o diálogo é para "Categoria"
    const isCategory = templates.nameDialog === "Categoria";
    // Verifica se o formulário é de criação
    const isStore = templates.storeForm;

    // Define a ação da API e erros da API com base no tipo de diálogo e operação
    if (isCategory) {
        apiAction = isStore ? templatesCategories.storeApiAction : templatesCategories.updateApiAction;
        apiErrors = templatesCategories.apiErrors;
    } else {
        // Para "Modelo", define o ID da categoria do template
        templates.formData.template_categories_id = templatesCategories.selected.id;
        apiAction = isStore ? templatesFiles.storeApiAction : templatesFiles.updateApiAction;
        apiErrors = templatesFiles.apiErrors;
    }

    // Executa a ação da API com os dados do formulário
    await apiAction({ ...templates.formData });

    // Verifica se não há erros na API
    if (Object.keys(apiErrors).length === 0) {
        // Determina a operação (store ou edit) e emite o evento de atualização
        const subTitle = isStore ? "Cadastrado com sucesso" : "Editado com sucesso";
		callSnackbar(subTitle);
        // emit("update", operation, templates.formData.name);		// todo Colocar aqui o novo Snackbar 
    } else {
        // Se houver erros, atualiza as mensagens de erro nos inputs
        updateErrorMessages(apiErrors, datas.value);
        // Define o estado de carregamento como falso e retorna
        isLoading.value = false;
        return;
    }

    // Define o estado de carregamento como falso
    isLoading.value = false;

    // Fecha o formulário e limpa os dados do formulário
    closeForm();
    clearForm();
}

function clearForm() {
    templates.formData = {};
}

function closeForm() {
    templates.storeForm = false;
    templates.editForm = false;
    templates.openModalForm = false;
}

function callSnackbar(subTitle) {
    snackbar.show = true;
    snackbar.title = templates.formData.name;
    snackbar.subTitle = subTitle;
    snackbar.color = "green";
    snackbar.timeout = 5000;
    snackbar.icon = "mdi-checkbox-marked-circle-outline";
}
</script>

