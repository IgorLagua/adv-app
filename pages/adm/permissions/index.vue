<template>
    <div>
        <AdmCommonTableTitle :title="'CADASTRO PERMISSÕES'" />

        <AdmPermissionsTable />

    </div>
</template>

<script setup>

definePageMeta({
    middleware: ["auth"],
    layout: "adm",
});

</script>

