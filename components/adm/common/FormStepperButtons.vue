<template>
    <v-container class="mt-n3">

        <!-- Layout para celulares -->
        <v-row v-if="xs">
            <v-col cols="12" class="d-flex justify-center">
                <v-btn
                    min-width="100"
                    variant="tonal"
                    @click="$emit('clearStepForm')"
                >
                    Limpar
                </v-btn>
                <v-btn
                    min-width="100"
                    variant="tonal"
                    class="mx-3"
                    @click="$emit('closeForm')"
                >
                    Fechar
                </v-btn>
                <v-btn
                    min-width="100"
                    color="blue"
                    :disabled="saveDisabled"
                    :loading="isLoading"
                    @click="$emit('saveButton')"
                >
                    salvar
                </v-btn>
            </v-col>
            <v-col cols="6" class="d-flex justify-start">
                <v-btn
                    min-width="100"
                    @click="prevButton"
                    variant="tonal"
                    :disabled="prevDisabled"
                >
                    voltar
                </v-btn>
            </v-col>
            <v-col cols="6" class="d-flex justify-end">
                <v-btn
                    min-width="100"
                    variant="tonal"
                    :disabled="nextDisabled"
                    @click="$emit('nextButton')"
                >
                    avançar
                </v-btn>
            </v-col>
        </v-row>

        <!-- Layout para telas maiores -->
        <v-row v-else>
            <v-col cols="3" class="d-flex justify-start">
                <v-btn
                    min-width="100"
                    @click="prevButton"
                    variant="tonal"
                    :disabled="prevDisabled"
                >
                    voltar
                </v-btn>
            </v-col>

            <v-col cols="6" class="d-flex justify-center">
                <v-btn
                    min-width="100"
                    variant="tonal"
                    @click="$emit('clearStepForm')"
                >
                    Limpar
                </v-btn>
                <v-btn
                    min-width="100"
                    variant="tonal"
                    class="mx-3"
                    @click="$emit('closeForm')"
                >
                    Fechar
                </v-btn>
                <v-btn
                    min-width="100"
                    color="blue"
                    :disabled="saveDisabled"
                    :loading="isLoading"
                    @click="$emit('saveButton')"
                >
                    salvar
                </v-btn>
            </v-col>

            <v-col cols="3" class="d-flex justify-end">
                <v-btn
                    min-width="100"
                    variant="tonal"
                    :disabled="nextDisabled"
                    @click="$emit('nextButton')"
                >
                    avançar
                </v-btn>
            </v-col>
        </v-row>
		
    </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { xs } = useDisplay();

const props = defineProps({
    saveDisabled: {
        type: Boolean,
        default: false,
    },
    nextDisabled: {
        type: Boolean,
        default: false,
    },
    isLoading: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits([
    "clearStepForm",
    "closeForm",
    "saveButton",
    "nextButton",
]);

const step = defineModel('step');

function prevButton() {
    if (step.value > 1) step.value--;
}
const prevDisabled = computed(() => (step.value > 1 ? false : true));


</script>
  
