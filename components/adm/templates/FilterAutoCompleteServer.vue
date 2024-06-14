<template>
    <v-autocomplete
        :items="data"
        :loading="loading"
        :placeholder="placeholder"
        item-title="name"
        no-filter
        return-object
        auto-select-first
    >
        <template v-if="!xs" v-slot:prepend>
            <v-sheet width="100" class="d-flex justify-end">
                <p class="font-weight-black">{{ itemTitle }}</p>
            </v-sheet>
        </template>
        <template v-slot:append>
            <v-btn
                color="blue-darken-1"
                @click="$emit('openDialog')"
                v-if="hasPermission('template', 'store')"
            >
                Cadastro
            </v-btn>
        </template>
    </v-autocomplete>
</template>


<script setup>
import { useDisplay } from "vuetify";
const { xs } = useDisplay();
const props = defineProps({
    data: { type: Array, required: true },
    itemTitle: { type: String, required: true },
    loading: { type: Boolean, required: false },
    placeholder: { type: String, required: false },
});
</script>



