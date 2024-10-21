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

                            <v-col>
                                <v-file-input
                                    label="Escolher imagem"
                                    prepend-inner-icon="mdi-camera"
                                    v-model="inputForm"
                                    @update:modelValue="updateImageValue"
                                    accept="image/png, image/jpeg, image/bmp"
                                    :rules="rules"
                                    :error-messages="
                                        filesImagesProfiles.apiErrors.message
                                    "
                                ></v-file-input>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-img
                                    v-if="
                                        imagePreview ||
                                        filesImagesProfiles.formData
                                    "
                                    :src="
                                        imagePreview ||
                                        filesImagesProfiles.formData
                                    "
                                    alt="Profile Image"
                                    max-width="100%"
                                ></v-img>
								

                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
                <!-- <pre>{{ authentication.user.files }}</pre> -->
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
// import { useFilesStore } from "~/stores/adm/files";
import { useFilesImagesProfilesStore } from "~/stores/adm/filesImagesProfiles";
import { useAuthenticationStore } from "~/stores/site/authentication";
import { useNotificationStore } from "~/stores/notification";


const users = useUsersStore();
// const files = useFilesStore();
const filesImagesProfiles = useFilesImagesProfilesStore();
const authentication = useAuthenticationStore();
const notification = useNotificationStore();


const dialog = defineModel();

const rules = [
    value => {
        return !value || !value.length || value[0].size < 2000000 || 'O tamanho da imagem deve ser inferior a 2 MB!'
    },
]

const isValid = ref(false);
const isLoading = ref(false);
const inputForm = ref([])

// Dados dos inputs com Validações --> vem da pasta composables/useDataUser
const dataFieldsRequired = ref(userFieldsRequired());

const { updateErrorMessages } = useApiErrorMessages();

async function saveButton() {
    // Verifica se o formulário é válido
    if (!isValid.value) return;
    // Define o estado de carregamento como verdadeiro
    isLoading.value = true;

    // Se senha for inserida e depois retirada o campo password vai existir e vai retornar um erro de validação da API que a senha deve ter 7 caracteres. Portanto se existir o campo e for não tiver valor, remove a propriedade password  
    if (users.formData.password === '') {
        delete users.formData.password;
    }

    await users.updateApiAction({ ...users.formData });

    // console.log('inputForm.value', inputForm.value)
    if (inputForm.value.length > 0) {
        // Criar um objeto FormData
        const formData = new FormData();
        formData.append('file', inputForm.value[0]);  // Supondo que fileInput seja seu input de arquivo
        formData.append('path', 'documentos/perfil');
        formData.append('name', 'foto');
        formData.append('fileable_type', 'users');
        formData.append('fileable_id', users.formData.id);

        // Logar os valores do FormData -- O console.log direto de um FormData não mostra o conteúdo diretamente, por isso pode parecer que está vazio, mas na verdade pode estar preenchido corretamente.
        // for (let [key, value] of formData.entries()) {
        //    console.log(key, value);
        // }

        // await files.uploadApiAction(formData);
        await filesImagesProfiles.uploadApiAction(formData);
    }


    // if (Object.keys(users.apiErrors).length === 0 && Object.keys(files.apiErrors).length === 0) {
    if (Object.keys(users.apiErrors).length === 0 && Object.keys(filesImagesProfiles.apiErrors).length === 0) {

        notification.setNotification('green', users.formData.name, 'Editado com sucesso', 5000, 'mdi-checkbox-marked-circle-outline');

    } else {
        // se existe erro no retorno da API
        // Atualizar mensagens de erro nos inputs com base nos erros da API
        if (Object.keys(users.apiErrors).length !== 0) {
            updateErrorMessages(users.apiErrors, dataFieldsRequired.value);
        }
        // if (Object.keys(files.apiErrors).length !== 0 ) {
        if (Object.keys(filesImagesProfiles.apiErrors).length !== 0) {
            // console.log('files.apiErrors', files.apiErrors.message);

            // updateErrorMessages(files.apiErrors, dataFieldsRequired.value);
            updateErrorMessages(filesImagesProfiles.apiErrors, dataFieldsRequired.value);
        }
        isLoading.value = false;
        return;
    }

    authentication.user = users.formData;
    isLoading.value = false;
    dialog.value = false;

	if (imagePreview) {
		filesImagesProfiles.formData = imagePreview
	}
}

const imagePreview = ref(null);

function updateImageValue(image) {
    if (image && image.length > 0) {
        const file = image[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            imagePreview.value = e.target.result;
        };
    } else {
        // Se nenhum arquivo for selecionado, use a imagem existente
        imagePreview.value = null;
    }

    if (Object.keys(filesImagesProfiles.apiErrors).length !== 0) {
        filesImagesProfiles.apiErrors = {};
    }
}

</script>