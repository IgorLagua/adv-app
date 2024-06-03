<template>
    <div>
        <AdmCommonTableTitle :title="'CONTROLE FUNCIONÁRIOS'" />

        <AdmUsersTable />
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ["auth"],
    layout: "adm",
});
</script>

