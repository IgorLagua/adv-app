<template>
    <div>
        <AdmCommonTableTitle :title="'CADASTRO EMPRESAS'" />

        <AdmCompaniesTable />

    </div>
</template>

<script setup>

definePageMeta({
    middleware: ["auth"],
    layout: "adm",
});

</script>

