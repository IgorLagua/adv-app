<template>
    <div>
        <v-text-field
            v-if="data.type === 'template' || data.type === 'text'"
            :label="data.label"
            :rules="data.rules"
            v-maska:[data.mask]
            v-model="currentValue"
            :error-messages="formError.zipCode"
        >
            <template v-if="data.type === 'template'" v-slot:append>
                <v-btn
                    :disabled="btnDisable"
                    :loading="loading"
                    @click="submitFormData(currentValue)"
                >
                    Buscar
                </v-btn>
            </template>
        </v-text-field>

        <v-select
            v-if="data.type === 'select'"
            :label="data.label"
            :rules="data.rules"
            :items="data.items"
            v-model="currentValue"
        ></v-select>
    </div>
</template>
  
  
<script setup>
	import { vMaska } from "maska";
	import { useZipCodeStore } from "~/stores/zipCode";

	const zipCode = useZipCodeStore();
	const loading = ref(false);

	const props = defineProps({
		data: { type: Object, required: true },
	});

	const currentValue = defineModel(); //https://www.youtube.com/watch?v=u4Z7Cc8AUck

	const btnDisable = computed(() => {
		if (!currentValue.value) {
			return true;
		}
		return currentValue.value.length < 9 ? true : false;
	});

	const emit = defineEmits(["update"]);

	const formError = ref({});

	async function submitFormData(value) {
		loading.value = true;
		formError.value.zipCode = "";
		try {
			await zipCode.getZipCodeAction(value);

			if (zipCode.formData.erro) {
				formError.value.zipCode = "CEP não encontrado";
			}

			emit("update");
		} catch (error) {
		} finally {
			loading.value = false;
		}
	}
</script>
