<template>
    <div class="text-center"
        
    >
    <v-hover
        v-slot="{ hover  }"
        
            
            
        >
        <v-snackbar
            v-model="common.showSnackbar"
            :color="color"
            :location="location ? location : 'right bottom'"
            :timeout="timeout ? timeout : 5000"
            v-bind="props"
            @mouseenter="hover = true"
            @mouseleave="hover = false"
            
        >
            <v-progress-linear 
                absolute
                v-model="progress"
                color=""
                height="10"
            ></v-progress-linear>
            <h2 class="py-4">{{ title }}</h2>
    
            <p> {{ subTitle }} </p>
    
            <template v-slot:actions>
                <v-icon 
                    icon="mdi-alert-circle-outline" 
                    size="x-large"
                ></v-icon>
            </template>
        </v-snackbar>
    </v-hover>
    </div>
</template>

<script setup>
    import { useCommonStore } from '~/stores/common'

    const common = useCommonStore()


    const props = defineProps({
        title: { type: String, required: true },
        subTitle: { type: String, required: false },
        location: { type: String, required: false },
        color: { type: String, required: false },   
        timeout: { type: Number, required: false },   // Cam be --> more 4000
    })

    onMounted(() => {
        openSnackbar()
    })

    const progress = ref(0);
    const hover = ref(false)

    const openSnackbar = () => {
        const interval = (props.timeout ? props.timeout : 5000) / 100;
        setInterval(() => {
            if (hover) {
                // console.log('hover.value', hover.value);
                progress.value += 1;
            }
        }, interval)
        
    }

    
</script>