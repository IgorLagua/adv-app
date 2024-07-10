<template>
    <AdmCommonDetails
        v-if="openModalDetails"
        v-model="openModalDetails"
        :detailsItems="customers.details"
        :isLoading="isLoading"
    />
</template>
  
<script setup>
import { useCustomersStore } from "~/stores/adm/customers";

const customers = useCustomersStore();
const openModalDetails = defineModel();
const isLoading = ref(false);

const props = defineProps({
    customerId: { type: String, required: true },
});

onMounted(async () => {
    // console.log('props.customerId', props.customerId);
    customers.formData = {}
    isLoading.value = true;
    // await sleep(3000)
    await customers.showApiAction(props.customerId);
    isLoading.value = false;
});
</script>
  
