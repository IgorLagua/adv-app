<template>
    <div>
        <v-col cols="8" sm="8" md="6" lg="5" xl="3" xxl="2" class="pt-1">
            <v-text-field
                placeholder="Quantidade"
                type="number"
                min="1"
                v-model="templatesFiles.selected.quantityPeople"
                @update:modelValue="
                    (newValue) => updateQuantity('peopleSelected', newValue)
                "
            >
                <template v-if="!xs" v-slot:prepend>
                    <v-sheet width="200" class="d-flex justify-end">
                        <p class="font-weight-black">Quantidade Pessoas</p>
                    </v-sheet>
                </template>
            </v-text-field>
        </v-col>

        <v-col cols="8" sm="8" md="6" lg="5" xl="3" xxl="2" class="pt-1">
            <v-text-field
                placeholder="Quantidade"
                type="number"
                min="1"
                v-model="templatesFiles.selected.quantityCompanies"
                @update:modelValue="
                    (newValue) => updateQuantity('companiesSelected', newValue)
                "
            >
                <template v-if="!xs" v-slot:prepend>
                    <v-sheet width="200" class="d-flex justify-end">
                        <p class="font-weight-black">Quantidade Empresas</p>
                    </v-sheet>
                </template>
            </v-text-field>
        </v-col>

		<AdmTemplatesFilterQuantityCards
			v-if="templatesFiles.selected.quantityPeople > 0"
			:quantityItem="templatesFiles.selected.quantityPeople"
			:name="'Pessoa Física'"
		></AdmTemplatesFilterQuantityCards>

		<AdmTemplatesFilterQuantityCards
			v-if="templatesFiles.selected.quantityCompanies > 0"
			:quantityItem="templatesFiles.selected.quantityCompanies"
			:name="'Empresa'"
		></AdmTemplatesFilterQuantityCards>


    </div>
</template>


<script setup>
import { useTemplatesStore } from "~/stores/adm/templates";
import { useTemplatesFilesStore } from "~/stores/adm/templatesFiles";
import { useDisplay } from "vuetify";
const { xs } = useDisplay();

const templates = useTemplatesStore();
const templatesFiles = useTemplatesFilesStore();

const updateQuantity = (selectedKey, newValue) => {
    const quantityKey = `quantity${
        selectedKey.charAt(0).toUpperCase() + selectedKey.slice(0, -8).slice(1)
    }`;

    if (!newValue) {
        templatesFiles.selected[selectedKey] = [];
        return;
    }

    if (templatesFiles.selected[selectedKey].length > newValue) {
        templatesFiles.selected[selectedKey].length = newValue;
    }

    // Atualiza a propriedade correspondente com o novo valor.
    templatesFiles.selected[quantityKey] = Number(newValue);
};


</script>