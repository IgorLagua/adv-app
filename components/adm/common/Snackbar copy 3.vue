<template>
    <div class="text-center">
        <v-hover 
            v-model="hoverState" 
            @update:modelValue="updateHover"
            v-slot="{ props }"
        >
            <v-snackbar
                v-model="currentValue"
                :color="color"
                :location="location"
                :timeout="timeout"
                v-bind="props"
            >
                <v-progress-linear
                    absolute
                    v-model="progress"
                    color=""
                    height="10"
                ></v-progress-linear>
                <h2 class="py-4">{{ title }}</h2>
                <p>{{ subTitle }}</p>
                <template v-slot:actions>
                    <v-icon
                        class="mt-3 mr-3"
                        :icon="icon"
                        size="60"
                    ></v-icon>
                </template>
            </v-snackbar>
        </v-hover>
    </div>
</template>
  
<script setup>
    import { ref, onMounted, onBeforeUnmount } from "vue";

    const isHovering = ref(false);
    let timer;

    const props = defineProps({
        title: { type: String, required: true },
        subTitle: { type: String, default: '' },
        location: { type: String, default: 'right bottom' },
        color: { type: String, default: '' },
        timeout: { type: Number, default: 5000 },
        icon: { type: String, default: '' },
    });

    const currentValue = defineModel()
    const progress = ref(0);
    const hoverState = ref(null);

    const updateHover = (value) => {
        isHovering.value = value;
    }

    onMounted(() => {
        openSnackbar();
    });

    onBeforeUnmount(() => {
        clearInterval(timer);
    });

    const openSnackbar = () => {
        const totalIntervals = 1000;
        const incrementValue = 100 / totalIntervals;
        const intervalDuration = props.timeout / totalIntervals;

        timer = setInterval(() => {
            if (!isHovering.value) {
                progress.value += incrementValue;
                if (progress.value >= 100) {
                    currentValue.value = false;
                    clearInterval(timer);
                }
            }
        }, intervalDuration);
    };
</script>
