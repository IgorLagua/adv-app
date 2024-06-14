<template>
    <div class="text-center pa-4">
        <v-dialog v-model="openModalAuthorization" max-width="800">
            <v-card>
                <v-alert color="orange-lighten-5">
                    <h2>{{ userData.name }}</h2>
                    <span>{{ userData.email }}</span>
                </v-alert>

                <v-data-table-server
                    v-model:items-per-page="itemsPerPage"
                    :items-per-page-options="itemsPerPageOptions"
                    items-per-page-text="Itens por página:"
                    :headers="headers"
                    :items="resources.data"
                    :items-length="resources.totalItems"
                    :loading="isLoading"
                    class="elevation-2"
                    @update:options="loadItems"
                >
                    <template v-slot:item="{ item }">
                        <tr>
                            <td>{{ item.description }}</td>
                            <td
                                v-for="permission in permissions.data"
                                :key="permission.id"
                            >
                                <v-checkbox
                                    color="blue"
                                    :value="{
                                        resource_id: item.id,
                                        permission_id: permission.id,
                                    }"
                                    v-model="selectedPermissions"
                                ></v-checkbox>
                            </td>
                        </tr>
                    </template>
                </v-data-table-server>

                <v-card-actions>
                    <v-btn
                        text="Fechar"
                        variant="tonal"
                        @click="openModalAuthorization = false"
                    ></v-btn>

                    <v-btn
                        color="blue"
                        text="Salvar"
                        variant="elevated"
                        :disabled="isLoadingSaveButton"
                        :loading="isLoadingSaveButton"
                        @click="saveButton"
                    ></v-btn>
                </v-card-actions>

                <!-- <pre>{{ selectedPermissions }}</pre> -->
            </v-card>
            <!-- <pre>{{ desserts }}</pre> -->
        </v-dialog>
    </div>
</template>

<script setup>
import { useResourcesStore } from "~/stores/adm/resources";
import { usePermissionsStore } from "~/stores/adm/permissions";
import { useResourcesPermissionsStore } from "~/stores/adm/resourcesPermissions";
import { useSnackbarStore } from "~/stores/snackbar";

const resources = useResourcesStore();
const permissions = usePermissionsStore();
const resourcesPermissions = useResourcesPermissionsStore();
const snackbar = useSnackbarStore();

const headers = computed(() => [
    { title: "Recursos", value: "description" },
    ...permissions.data.map((permission) => ({
        title: permission.description,
        value: permission.description,
    })),
]);
const itemsPerPage = ref(5);
const itemsPerPageOptions = [
    { value: 5, title: "5" },
    { value: 10, title: "10" },
    { value: 20, title: "20" },
];

const props = defineProps({
    userData: { type: Object, required: true },
});

const openModalAuthorization = defineModel();

const selectedPermissions = ref([]); // Array para armazenar os valores das permissões selecionadas
const formData = ref({ user_id: props.userData.id });
const isLoading = ref(false);
const isLoadingSaveButton = ref(false);

async function loadItems({ page, itemsPerPage, sortBy }) {
    isLoading.value = true;

    const paramsData = {
        page,
        itemsPerPage,
        sortBy,
        // search: searchTable.value ? searchTable.value : [],
    };

    // await sleep(1000)
    await resources.indexApiAction(paramsData);
    // await sleep(1000)
    await permissions.indexApiAction();
    await resourcesPermissions.indexApiAction(formData.value);
    selectedPermissions.value = resourcesPermissions.data;
    isLoading.value = false;
}

async function saveButton() {
    isLoadingSaveButton.value = true;
    formData.value.resourcesPermissions = selectedPermissions.value;
    // console.log('formData.value', formData.value);
    await resourcesPermissions.storeApiAction(formData.value);
    // await sleep(1000)
    callSnackbar();
    isLoadingSaveButton.value = false;
    openModalAuthorization.value = false;
}

function callSnackbar() {
    snackbar.show = true
    snackbar.title = props.userData.name
    snackbar.subTitle = "Modificado com sucesso"
    snackbar.color = "green"
    snackbar.timeout = 5000
    snackbar.icon = "mdi-checkbox-marked-circle-outline"
}
</script>

