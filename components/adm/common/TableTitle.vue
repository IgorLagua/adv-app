<template>

    <h2 class="text-center">{{ title }}</h2>

</template>


<script setup>

    const props = defineProps({
        title: { type: String, required: true },
    })
    
</script>


