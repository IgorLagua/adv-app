<template>
    <v-dialog v-model="openModalForm" max-width="500">
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
                            v-model="users.formData[data.key]"
                        />
                    </v-col>
                </v-card-text>

                <v-card-actions class="mr-5 mb-2 pt">
                    <v-spacer></v-spacer>

                    <v-btn min-width="100" variant="tonal" @click="clearForm">
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
</template>

<script setup>
import { useUsersStore } from "~/stores/adm/users";
import { useSnackbarStore } from "~/stores/snackbar";

const users = useUsersStore();
const snackbar = useSnackbarStore();

const { updateErrorMessages } = useApiErrorMessages();

const isLoading = ref(false);

const props = defineProps({
    title: { type: String, required: false },
});

const openModalForm = defineModel();

const isValid = ref(false);

// Dados dos inputs com Validações --> vem da pasta composables/useDataUser
const dataFieldsRequired = ref(userFieldsRequired());

// users.formData = {
//     email: "teste@teste.com",
//     password: "password",
//     name: "teste",
// };

async function saveButton() {
    if (isValid.value) {
        isLoading.value = true;

        if (users.storeForm) {
            await users.storeApiAction({ ...users.formData });

            if (Object.keys(users.apiErrors).length === 0) {
                callSnackbar("Criado com sucesso");
            } else {
                // Se existe erro no retorno da API
                // Atualizar mensagens de erro nos inputs com base nos erros da API
                updateErrorMessages(users.apiErrors, dataFieldsRequired.value);
                isLoading.value = false;
                return;
            }
        } else if (users.editForm) {
            await users.updateApiAction({
                ...users.formData,
            });

            if (Object.keys(users.apiErrors).length === 0) {
                callSnackbar("Modificado com sucesso");
            } else {
                // se existe erro no retorno da API
                // Atualizar mensagens de erro nos inputs com base nos erros da API
                updateErrorMessages(users.apiErrors, dataFieldsRequired.value);
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
    users.formData = {};
}

function callSnackbar(subTitle) {
    snackbar.show = true;
    snackbar.title = users.formData.name;
	snackbar.subTitle = subTitle;
    snackbar.color = "green";
    snackbar.timeout = 5000;
    snackbar.icon = "mdi-checkbox-marked-circle-outline";
}
</script>

