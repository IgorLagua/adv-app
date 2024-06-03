<template>

    <div>
        
    </div>

    <!-- <v-text-field
        :loading="loading"
        density="compact"
        variant="solo"
        label="Localizar"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick"
    ></v-text-field> -->

</template>

<script setup>

    const loaded = ref(false)
    const loading = ref(false)
    
    // methods
    const onClick = () => {

    // function onClick () {
        loading.value = true

        setTimeout(() => {
            loading.value = false
            loaded.value = true
        }, 2000)
    }

</script>