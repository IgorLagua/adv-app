<template>
    <div>
        <AdmCommonTableTitle :title="'CONTROLE USUÁRIOS'" />

        <AdmUsersTable />
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ["auth"],
    layout: "adm",
});
</script>

