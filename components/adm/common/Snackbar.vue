<template>
    <div class="text-center">
        <v-hover @update:modelValue="updateHover" v-slot="{ props }">
            <v-snackbar v-model="currentValue" :color="color" :location="location" :timeout="timeout" v-bind="props">
                <v-progress-linear absolute v-model="progress" color="" height="10"></v-progress-linear>
                <h2 class="py-4">{{ title }}</h2>
                <p>{{ subTitle }}</p>
                <template v-slot:actions>
                    <v-icon class="mt-3 mr-3" :icon="icon" size="60"></v-icon>
                </template>
            </v-snackbar>
        </v-hover>
    </div>
</template>

<script setup>

const isHovering = ref(false);
const { title, subTitle, location, color, timeout, icon } = defineProps({
    title: { type: String, required: true },
    subTitle: { type: String, default: '' },
    location: { type: String, default: 'right bottom' },
    color: { type: String, default: '' },
    timeout: { type: Number, default: 5000 },
    icon: { type: String, default: '' },
});

const currentValue = defineModel();
const progress = ref(0);

const updateHover = (isOver) => {
    isHovering.value = isOver;
}

onMounted(() => {
    openSnackbar();
});

const openSnackbar = () => {
    let startTime = null;
    let pauseDuration = 0;
    let lastTimestamp = null;

    const animateProgress = (timestamp) => {
        if (!startTime) startTime = timestamp;

        if (isHovering.value) {
            if (lastTimestamp) pauseDuration += timestamp - lastTimestamp;
            lastTimestamp = timestamp;
            requestAnimationFrame(animateProgress);
            return;
        }

        const elapsed = timestamp - startTime - pauseDuration;
        progress.value = (elapsed / timeout) * 100;

        if (progress.value >= 100) {
            currentValue.value = false;
            return;
        }

        lastTimestamp = timestamp;
        requestAnimationFrame(animateProgress);
    };

    requestAnimationFrame(animateProgress);
};
</script>
