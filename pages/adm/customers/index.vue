<template>
    <div>
        <AdmCommonTableTitle :title="'CADASTRO CLIENTES'" />

        <AdmCustomersTable />

    </div>
</template>

<script setup>

definePageMeta({
    middleware: ["auth"],
    layout: "adm",
});

</script>



