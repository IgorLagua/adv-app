<template>
    <div>
        <h2>Modelos de texto padrão</h2>

        <AdmTemplatesFilter class="my-4" />

        <AdmTemplatesEditor v-if="templates.showEditor" />

    </div>
</template>
  
<script setup>
import { useTemplatesStore } from "~/stores/adm/templates";
const templates = useTemplatesStore();

definePageMeta({
    middleware: ["auth"],
    layout: "adm",
});


</script>
  
  
  

