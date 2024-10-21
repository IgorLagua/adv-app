<template>
    <v-dialog v-model="dialog">
        <v-card>
            <v-card-text>
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
                                v-model="inputForm"
                                @update:modelValue="updateImageValue"
                                :error-messages="
                                    filesImagesProfiles.apiErrors.message
                                "
                            ></v-file-input>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-img
                                v-if="authentication.user.files.length"
                                :src="filesImagesProfiles.formData"
                                alt="Profile Image"
                            ></v-img>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn text="Fechar" @click="dialog = false"></v-btn>
                <v-btn text="Salvar" @click="saveButton"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { useUsersStore } from "~/stores/adm/users";
import { useFilesImagesProfilesStore } from "~/stores/adm/filesImagesProfiles";
import { useAuthenticationStore } from "~/stores/site/authentication";
const users = useUsersStore();
const filesImagesProfiles = useFilesImagesProfilesStore();
const authentication = useAuthenticationStore();
const dialog = defineModel();
const isValid = ref(false);
const inputForm = ref([])

// Dados dos inputs com Validações --> vem da pasta composables/useDataUser
const dataFieldsRequired = ref(userFieldsRequired());
const { updateErrorMessages } = useApiErrorMessages();
async function saveButton() {
    await users.updateApiAction({ ...users.formData });
    if (inputForm.value.length > 0) {
        // Criar um objeto FormData
        const formData = new FormData();
        formData.append('file', inputForm.value[0]);
        formData.append('path', 'documentos/perfil');
        formData.append('name', 'foto');
        formData.append('fileable_type', 'users');
        formData.append('fileable_id', users.formData.id);
        await filesImagesProfiles.uploadApiAction(formData);
    }
    authentication.user = users.formData;
    dialog.value = false;
}
const imagePreview = ref(null);
function updateImageValue(image) {
    if (image.length > 0) {
        console.log('image', image);
    }

    if (Object.keys(filesImagesProfiles.apiErrors).length !== 0) {
        filesImagesProfiles.apiErrors = {}
    }
}
</script>