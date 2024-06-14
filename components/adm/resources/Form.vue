<template>
    <div class="text-center pa-4">
        <v-dialog v-model="openModalForm" max-width="600">
            <v-card>
                <v-alert color="orange-lighten-5">
                    <h3>{{ title }}</h3>
                </v-alert>

                <v-form v-model="isValid">
                    <v-card-text class="pb-0">
                        <v-col
                            v-for="data in dataFieldsRequired"
                            :key="data.label"
                            :cols="data.cols"
                            :sm="data.sm"
                            :md="data.md"
                        >
                            <AdmCommonFormDefault
                                :data="data"
                                v-model="resources.formData[data.key]"
                            />
                        </v-col>
                    </v-card-text>

                    <v-card-actions class="mr-5 mb-2 pt">
                        <v-spacer></v-spacer>

                        <v-btn
                            min-width="100"
                            variant="tonal"
                            @click="clearForm"
                        >
                            Limpar
                        </v-btn>
                        <v-btn
                            min-width="100"
                            variant="tonal"
                            @click="openModalForm = false"
                        >
                            Fechar
                        </v-btn>
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
    </div>
</template>

<script setup>
import { useResourcesStore } from "~/stores/adm/resources";
import { useSnackbarStore } from "~/stores/snackbar";

const resources = useResourcesStore();
const snackbar = useSnackbarStore();

const isLoading = ref(false);

const openModalForm = defineModel();

const props = defineProps({
    title: { type: String, required: false },
});

const isValid = ref(false);

// Dados dos inputs com Validações --> vem da pasta composables/useDataResource
const dataFieldsRequired = ref(resourceFieldsRequired());

async function saveButton() {
    if (isValid.value) {
        isLoading.value = true;

        if (resources.storeForm) {
            await resources.storeApiAction({
                ...resources.formData,
            });

            if (Object.keys(resources.apiErrors).length === 0) {
                callSnackbar("Criado com sucesso");
            }

            else {
                // Se existe erro no retorno da API
                // Atualizar mensagens de erro nos inputs com base nos erros da API
                updateErrorMessages(resources.apiErrors, dataFieldsRequired.value);
                isLoading.value = false;
                return;
            }
        } else if (resources.editForm) {
            await resources.updateApiAction({
                ...resources.formData,
            });

            if (Object.keys(resources.apiErrors).length === 0) {
                callSnackbar("Modificado com sucesso");
            } else {
                // se existe erro no retorno da API
                // Atualizar mensagens de erro nos inputs com base nos erros da API
                updateErrorMessages(resources.apiErrors, dataFieldsRequired.value);
                isLoading.value = false;
                return;
            }
        }

        isLoading.value = false;

		openModalForm.value = false;
        clearForm();
    }
}

function clearForm() {
    resources.formData = {};
}

function callSnackbar(subTitle) {
    snackbar.show = true;
    snackbar.title = resources.formData.name;
    snackbar.subTitle = subTitle;
    snackbar.color = "green";
    snackbar.timeout = 5000;
    snackbar.icon = "mdi-checkbox-marked-circle-outline";
}
</script>

