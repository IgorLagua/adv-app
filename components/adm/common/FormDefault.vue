<template>
    <div>
        <v-text-field
            v-if="data.type === 'template' || data.type === 'text'"
            :label="data.label"
            :rules="data.rules"
            :maxlength="data.maxLength"
            v-maska:[data.mask]
            @maska="onMaska"
            v-model="currentValue"
            :error-messages="data.errorMensages"
        >
            <template
                v-if="data.type === 'template'"
                v-slot:append="{ isValid }"
            >
                <v-btn
                    :disabled="!isValid.value"
                    :loading="data.loading"
                    @click="submitFormData(currentValue)"
                >
                    Buscar
                </v-btn>
            </template>
        </v-text-field>

        <!-- <v-text-field
            v-if="data.type === 'text'"
            :label="data.label"
            :rules="data.rules"
            :maxlength="data.maxLength"
            v-maska:[data.mask]
            v-model="currentValue"
        ></v-text-field> -->

        <v-select
            v-if="data.type === 'select'"
            :label="data.label"
            :rules="data.rules"
            :items="data.items"
	    item-title="name"
    	    item-value="value"
            v-model="currentValue"
            :error-messages="data.errorMensages"
        ></v-select>

	<!-- <v-select
            v-if="data.type === 'selectCustomValue'"
            :label="data.label"
            :rules="data.rules"
            :items="data.items"
	    item-title="name"
    	    item-value="value"
            v-model="currentValue"
            :error-messages="data.errorMensages"
        ></v-select> -->

        <v-text-field
            v-if="data.type === 'date'"
            :label="data.label"
            :rules="data.rules"
            type="date"
            v-model="currentValue"
            :error-messages="data.errorMensages"
        ></v-text-field>

        <v-autocomplete
            v-if="data.type === 'autocomplete'"
            :label="data.label"
            :rules="data.rules"
            :items="data.items"
            v-model="currentValue"
            :error-messages="data.errorMensages"
        ></v-autocomplete>

        <v-textarea
            v-if="data.type === 'textArea'"
            :label="data.label"
            :rules="data.rules"
            v-model="currentValue"
            :error-messages="data.errorMensages"
        ></v-textarea>

        <v-text-field
			v-if="data.type === 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Senha"
            prepend-inner-icon="mdi-lock-outline"
            @click:append-inner="showPassword = !showPassword"
            v-model="currentValue"
			:rules="data.rules"
        ></v-text-field>
    </div>
</template>
  
  
<script setup>
import { vMaska } from "maska";

const props = defineProps({
    data: { type: Object, required: true },
});

const onMaska = (event) => {
    // 	if ( event.detail.completed) {
    // 		console.log('event', event)
    // 	}
    // // 	console.log({
    // //     masked: event.detail.masked,
    // //     unmasked: event.detail.unmasked,
    // //     completed: event.detail.completed
    // //   })
};

const currentValue = defineModel(); //https://www.youtube.com/watch?v=u4Z7Cc8AUck

// Assistindo a mudanças em currentValue para limpar as mensagens de erro da API
// todo --> acho que com essa mudança pode tirar o composable clearErrorMessage dentro de useApiErrorMessages
watch(currentValue, () => {
    if (props.data.errorMensages !== null) {
        props.data.errorMensages = null;
    }
});

const showPassword = ref(false);


const emit = defineEmits(["update"]);

function submitFormData(value) {
    emit("update", value);
}
</script>
