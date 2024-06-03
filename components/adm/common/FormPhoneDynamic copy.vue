<template>
    <div>
        <div v-for="(field, index) in phones" :key="index">
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        class="mb-2"
                        :label="`Telefone ${index + 1}`"
                        :placeholder="`Telefone ${index + 1}`"
                        :rules="phoneRules"
                        v-maska:[phoneMask]
                        v-model="field.number"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="5">
                    <v-select
                        label="Tipo"
                        placeholder="Tipo"
                        multiple
                        chips
                        :items="phoneTypes"
                        v-model="field.types"
                    >
                        <template v-slot:append>
                            <v-btn 
                                width="120" 
                                @click="index === 0 ? addField() : removeField(index)"
                            >
                                {{ index === 0 ? 'Adicionar' : 'Remover' }}
                            </v-btn>
                        </template>
                    </v-select>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script setup>
    const { phoneMask } = useMask()
    const { requiredValidation, minLengthValidation, maxLengthValidation } = useValidation()
    
    const phoneTypes = ['Celular', 'WhatsApp', 'Residencial', 'Comercial']
    const phoneRules = [
        // requiredValidation({ name: 'O telefone' }),
        minLengthValidation({ name: 'O telefone', number: 13 }),
        maxLengthValidation({ name: 'O telefone', number: 15 }),
    ]

    const phones = defineModel()

    watchEffect(() => {
        if (!phones.value || phones.value.length === 0) {
            phones.value = [{ number: null, types: null }]
        }
    });

    const addField = () => {
        phones.value.push({ number: null, types: null })
    }

    const removeField = index => {
        phones.value.splice(index, 1)
    }
</script>
