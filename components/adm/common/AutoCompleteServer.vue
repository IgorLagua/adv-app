<template>
    <v-autocomplete
        :items="data"
        :item-title="itemTitle"
        :loading="loading"
        :label="label"
        :placeholder="placeholder"
        auto-select-first
        return-object
    >
        <template v-slot:item="{ props, item }">
            <v-list-item
                v-bind="props"
                :title="item?.raw[itemTitle]"
                :subtitle="item?.raw[itemSubTitle]"
            ></v-list-item>
        </template>
    </v-autocomplete>
</template>


<script setup>

const props = defineProps({
    data: { type: Array, required: true },
    itemTitle: { type: String, required: true },
    itemSubTitle: { type: String, required: false },
    loading: { type: Boolean, required: false },
    label: { type: String, required: false },
    placeholder: { type: String, required: false },
});

</script>