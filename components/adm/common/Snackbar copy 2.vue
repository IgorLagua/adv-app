<template>
    <div class="text-center">
        <v-hover 
			v-model="teste" 
			@update:modelValue="updateHover"
			v-slot="{ props }"
		>
            <v-snackbar
                v-model="currentValue"
                :color="color"
                :location="location ? location : 'right bottom'"
                :timeout="timeout ? timeout : 5000"
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


	const isHovering = ref(false);
	

	const props = defineProps({
		title: { type: String, required: true },
		subTitle: { type: String, required: false },
		location: { type: String, required: false },
		color: { type: String, required: false },
		timeout: { type: Number, required: false },
		icon: { type: String, required: false },
	});

	const currentValue = defineModel()

	const progress = ref(0);

	const teste = ref(null);
	const updateHover = (value) => {
		isHovering.value = value
    }

	onMounted(() => {
		openSnackbar();
	});

	const openSnackbar = () => {
        const totalIntervals = 1000; // 1000 intervalos para uma progressão mais suave
        const incrementValue = 100 / totalIntervals; // O valor que a barra de progresso aumentará a cada intervalo
        const intervalDuration = (props.timeout ? props.timeout : 5000) / totalIntervals; // Dividindo o tempo total pelo número de intervalos

        const timer = setInterval(() => {
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
  