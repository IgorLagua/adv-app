<template>
    <AdmCommonDetails
        v-if="openModalDetails"
        v-model="openModalDetails"
        :detailsItems="companies.details"
        :isLoading="isLoading"
    />
	<!-- <pre>{{ companies.formData }}</pre> -->
</template>
  
<script setup>
import { useCompaniesStore } from "~/stores/adm/companies";

const companies = useCompaniesStore();
const openModalDetails = defineModel();
const isLoading = ref(false);

const props = defineProps({
    companyId: { type: String, required: true },
});

onMounted(async () => {
    // console.log('props.companyId', props.companyId);
    companies.formData = {}
    isLoading.value = true;
    // await sleep(3000)
    await companies.showApiAction(props.companyId);
    isLoading.value = false;
});
</script>
  
