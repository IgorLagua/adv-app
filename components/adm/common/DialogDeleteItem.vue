<template>
    <div class="text-center">
        <v-dialog
            v-model="common.showDialogDelete"
            width="auto"
            transition="dialog-bottom-transition"
            activator="parent"
        >
            <v-card>               
                <div class="text-h5 text-center ma-3 text-red-darken-4">
                    <v-icon
                        size="large"
                        color="red"
                        icon="mdi-alert"
                    ></v-icon>
                    Tem certeza de que deseja excluir ? 
                    <p class="font-weight-bold">
                        {{ name }}
                    </p>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        color="primary" 
                        variant="tonal" 
                        @click="common.showDialogDelete = false"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        color="red"
                        prepend-icon="mdi-delete-outline"
                        variant="tonal"
                        @click="deleteItem"
                        >
                        Apagar
                    </v-btn>
                    
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
      </v-dialog>

    </div>
</template>

<script setup>
    import { useCommonStore } from '~/stores/common'

    const common = useCommonStore()


    const props = defineProps({
        name: { type: String, required: true },
    })

    const emit = defineEmits(['update'])

    function deleteItem () {
        common.showDialogDelete = false
        emit('update')
        // console.log("item", item);
    }
    
</script>