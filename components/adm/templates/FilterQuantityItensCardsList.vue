<template>
	<div>
		<v-list 
			height="250" 
			class="ml-n4" 
			density="compact" 
		>
			<v-list-item 
				v-for="field in Object.keys(itemSelected)" :key="field" 
					class="my-n3"
				>
					<v-tooltip 
						text="Copiar" 
						location="top"
					>
						<template v-slot:activator="{ props }">
							<v-icon 
								v-bind="props" 
								color="green" 
								class="mr-2" 
								icon="mdi-content-copy" 
								@click="copyToClipboard(itemSelected[field].key)"
							></v-icon>
						</template>
					</v-tooltip>

				<strong class="text-red-lighten-1">
					{{ itemSelected[field].key }}:
				</strong>
				{{ itemSelected[field].value }}

			</v-list-item>
		</v-list>

		<AdmCommonSnackbar
            v-if="showSnackbar"
            v-model="showSnackbar"
            :title="titleSnackbar"
            :subTitle="'Copiado com sucesso'"
            :color="'green'"
            :timeout="4000"
            :icon="'mdi-spellcheck'"
        ></AdmCommonSnackbar>

	</div>
	
</template>


<script setup>

const props = defineProps({
	itemSelected: { type: Object, required: true },
});

// const emit = defineEmits(["update"]);


const showSnackbar = ref(false);
const titleSnackbar = ref(null);
const copyToClipboard = (text) => {
    showSnackbar.value = false;
    titleSnackbar.value = text;
    navigator.clipboard
        .writeText(text)
        .then(() => {
            showSnackbar.value = true;
            // console.log('Texto copiado para a área de transferência!');
        })
        .catch((err) => {
            console.error("Erro ao copiar texto: ", err);
        });
};

</script>