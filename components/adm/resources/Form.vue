<template>
    <div class="text-center pa-4">
        <v-dialog v-model="openModalForm" max-width="600">
            <v-card>
                <v-alert color="orange-lighten-5">
                    <h3>{{ title }}</h3>
                </v-alert>

                <v-form v-model="isValid">
                    <v-card-text class="pb-0">
                        <v-col cols="12">
                            <v-text-field
                                placeholder="Nome"
                                label="Nome"
                                v-model="resources.formData.name"
                                :rules="[
                                    requiredValidation({
                                        name: 'A permissão',
                                    }),
                                    minLengthValidation({
                                        name: 'A permissão',
                                        number: 3,
                                    }),
                                    maxLengthValidation({
                                        name: 'A permissão',
                                        number: 70,
                                    }),
                                ]"
                            >
                            </v-text-field>
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
                            @click="closeForm"
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
const resources = useResourcesStore();

const isLoading = ref(false);

const openModalForm = defineModel();

const props = defineProps({
    title: { type: String, required: false },
});

const isValid = ref(false);

// Validações dos inputs --> vem da pasta composables
const { requiredValidation, minLengthValidation, maxLengthValidation } =
    useValidation();

// const { updateErrorMessages } = useApiErrorMessages();

const emit = defineEmits(["update"]);

async function saveButton() {
    if (isValid.value) {
        isLoading.value = true;

        if (resources.storeForm) {
            await resources.storeApiAction({
                ...resources.formData,
            });

            if (Object.keys(resources.apiErrors).length === 0) {
                emit("update", "store", resources.formData.name);
            } 
			
			// else {
            //     // Se existe erro no retorno da API
            //     // Atualizar mensagens de erro nos inputs com base nos erros da API
            //     updateErrorMessages(resources.apiErrors, datas.value);
            //     isLoading.value = false;
            //     return;
            // }
        } else if (resources.editForm) {
            await resources.updateApiAction({
                ...resources.formData,
            });

            if (Object.keys(resources.apiErrors).length === 0) {
                emit("update", "edit", resources.formData.name);
            } 
			
			// else {
            //     // se existe erro no retorno da API
            //     // Atualizar mensagens de erro nos inputs com base nos erros da API
            //     updateErrorMessages(resources.apiErrors, datas.value);
            //     isLoading.value = false;
            //     return;
            // }
        }

        isLoading.value = false;

        closeForm();
        clearForm();
    }
}

function clearForm() {
    resources.formData = {};
}

function closeForm() {
    resources.storeForm = false;
    resources.editForm = false;
    openModalForm.value = false;
}
</script>

