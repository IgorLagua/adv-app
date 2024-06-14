<template>
    <div>
        <v-dialog v-model="dialog" max-width="450">
            <v-card>
                <v-alert icon="mdi-account" color="orange-lighten-5">
                    <h3>Perfil</h3>
                </v-alert>

                <v-card-text class="mt-4">
                    <v-form v-model="isValid">
                        <v-row>
                            <v-col
                                v-for="data in dataFieldsRequired"
                                :key="data.label"
                                :cols="data.cols"
                            >
                                <AdmCommonFormDefault
                                    :data="data"
                                    v-model="users.formData[data.key]"
                                />
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        min-width="100"
                        text="Fechar"
                        variant="tonal"
                        @click="dialog = false"
                    ></v-btn>

                    <v-btn
                        color="blue-darken-1"
                        min-width="100"
                        text="Salvar"
                        variant="flat"
                        :disabled="!isValid"
                        :loading="isLoading"
                        @click="saveButton"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { useUsersStore } from "~/stores/adm/users";
import { useAuthenticationStore } from "~/stores/site/authentication";
import { useSnackbarStore } from "~/stores/snackbar";


const users = useUsersStore();
const authentication = useAuthenticationStore();
const snackbar = useSnackbarStore();

const dialog = defineModel();

const isValid = ref(false);
const isLoading = ref(false);

// Dados dos inputs com Validações --> vem da pasta composables/useDataUser
const dataFieldsRequired = ref(userFieldsRequired());

const { updateErrorMessages } = useApiErrorMessages();

async function saveButton() {
    // Verifica se o formulário é válido
    if (!isValid.value) return;
    // Define o estado de carregamento como verdadeiro
    isLoading.value = true;

	// Se senha for inserida e depois retirada o campo password vai existir e vai retornar um erro de validação da API que a senha deve ter 7 caracteres. Portanto se existir o campo e for não tiver valor, remove a propriedade password  
	if ( users.formData.password === '' ) {
		delete users.formData.password;
	}
	
    await users.updateApiAction({ ...users.formData });

    if (Object.keys(users.apiErrors).length === 0) {
		callSnackbar()
    } else {
        // se existe erro no retorno da API
        // Atualizar mensagens de erro nos inputs com base nos erros da API
        updateErrorMessages(users.apiErrors, dataFieldsRequired.value);
        isLoading.value = false;
        return;
    }

    authentication.user = users.formData;
    isLoading.value = false;
    dialog.value = false;
}

function callSnackbar() {
    snackbar.show = true;
    snackbar.title = users.formData.name;
    snackbar.subTitle = "Editado com sucesso";
    snackbar.color = "green";
    snackbar.timeout = 5000;
    snackbar.icon = "mdi-checkbox-marked-circle-outline";
}
</script>