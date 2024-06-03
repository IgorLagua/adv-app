<template>
	<v-dialog v-model="templates.openModalForm" max-width="600">
		<v-card>
			<v-alert color="orange-lighten-5">
				<h3>{{ title }}</h3>
			</v-alert>
			
			<v-form v-model="isValid">
				<v-card-text class="pb-0">
					<v-col v-for="data in datas" :key="data.label">
						<AdmCommonFormDefault :data="data" v-model="templates.formData[data.key]" />
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
					<v-btn color="blue-darken-1" min-width="100" variant="flat" :disabled="!isValid" :loading="isLoading"
						@click="saveButton">
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

const templates = useTemplatesStore();
const templatesCategories = useTemplatesCategoriesStore();

const isLoading = ref(false);

const props = defineProps({
	title: { type: String, required: false },
});

const emit = defineEmits(["update"]);

const isValid = ref(false);

// Validações dos inputs --> vem da pasta composables
const { requiredValidation, minLengthValidation, maxLengthValidation } =
	useValidation();

const datas = ref([
	{
		type: "text",
		label: templates.nameDialog,
		errorMensages: null,
		rules: [
			requiredValidation({ name: templates.nameDialog }),
			minLengthValidation({ name: templates.nameDialog, number: 2 }),
			maxLengthValidation({ name: templates.nameDialog, number: 40 }),
		],
		key: "name",
	},
	{
		type: "textArea",
		label: "Descrição",
		errorMensages: null,
		rules: [
			minLengthValidation({ name: "A descrição", number: 2 }),
			maxLengthValidation({ name: "A descrição", number: 255 }),
		],
		key: "description",
	},
]);

const { updateErrorMessages } = useApiErrorMessages();

async function saveButton() {
	if (isValid.value) {
		isLoading.value = true;
		
		if (templates.storeForm) {

			await templatesCategories.storeApiAction({...templates.formData});

			if (Object.keys(templatesCategories.apiErrors).length === 0) {
				emit("update", "store", templates.formData.name);
			} else {
				// Se existe erro no retorno da API
				// Atualizar mensagens de erro nos inputs com base nos erros da API				
				updateErrorMessages(templatesCategories.apiErrors, datas.value);
				isLoading.value = false;
				return;
			}
		}
		else if (templates.editForm) {
			
			await templatesCategories.updateApiAction({...templates.formData});
			
			if (Object.keys(templatesCategories.apiErrors).length === 0) {
				emit("update", "edit", templates.formData.name);
			} else {
				// se existe erro no retorno da API
				// Atualizar mensagens de erro nos inputs com base nos erros da API
				updateErrorMessages(templatesCategories.apiErrors, datas.value);
				isLoading.value = false;
				return;
			}
		}

		isLoading.value = false;

		closeForm();
		clearForm();
	}
}

function clearForm() {
	templates.formData = {};
}

function closeForm() {
	templates.storeForm = false;
	templates.editForm = false;
	templates.openModalForm = false;
}
</script>

