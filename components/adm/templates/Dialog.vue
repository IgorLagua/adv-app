<template>
    <div>
        <v-dialog v-model="templates.showDialog" max-width="800">
            <v-card>
                <v-alert color="orange-lighten-5">
                    <h3>{{ title }}</h3>
                </v-alert>

                <v-divider class="mb-2"></v-divider>

                <v-card-text>
                    <AdmTemplatesDialogTable @update="updateSelectTable" />
                </v-card-text>

                <v-card-actions class="mr-4 mb-2">
                    <v-spacer></v-spacer>
                    <v-btn
                        min-width="120"
                        variant="tonal"
                        @click="clearSelectedTable"
                    >
                        Limpar
                    </v-btn>
                    <v-btn min-width="120" variant="tonal" @click="closeForm">
                        Fechar
                    </v-btn>
                    <v-btn
                        :disabled="!Object.keys(selectedTable).length > 0"
                        color="blue-darken-1"
                        @click="applyForm"
                        min-width="120"
                        variant="flat"
                    >
                        Aplicar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script setup>
import { useTemplatesStore } from "~/stores/adm/templates";
import { useTemplatesCategoriesStore } from "~/stores/adm/templatesCategories";
import { useTemplatesFilesStore } from "~/stores/adm/templatesFiles";

const templates = useTemplatesStore();
const templatesCategories = useTemplatesCategoriesStore();
const templatesFiles = useTemplatesFilesStore();

const props = defineProps({
    title: { type: String, required: true },
});

onUnmounted(() => {
    templates.formData = {};
});

const emit = defineEmits(["update"]);

const selectedTable = ref([]);

function updateSelectTable(item) {
    selectedTable.value = { ...item };
    // console.log('selectedTable.value', selectedTable.value);
}

const clearSelectedTable = () => {
    // templatesCategories.selected = null;
    templates.selectedTable = [];
    // templates.search = null;
};

const closeForm = () => {
    templates.showDialog = false;
};

const applyForm = () => {
    if (templates.nameDialog === "Categoria") {
        templatesCategories.selected = selectedTable.value;
    }

    if (templates.nameDialog === "Modelo") {
        templatesFiles.selected = selectedTable.value;
    }
    emit("update");
    templates.showDialog = false;
};
</script>