<template>
    <div>
        <AdmCommonTableTitle :title="'CADASTRO RECURSOS'" />

        <AdmResourcesTable />

    </div>
</template>

<script setup>

definePageMeta({
    middleware: ["auth"],
    layout: "adm",
});

</script>

