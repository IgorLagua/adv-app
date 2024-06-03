<template>
    <div>
        <div v-for="(phone, index) in phones" :key="index">
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        class="mb-2"
                        :label="`Telefone ${index + 1}`"
                        :placeholder="`Telefone ${index + 1}`"
                        :rules="phoneRules"
                        v-maska:[phoneMask]
                        v-model="phone.number"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="5">
                    <v-select
                        label="Tipo"
                        placeholder="Tipo"
                        multiple
                        chips
                        :items="phoneTypes"
                        item-title="type"
                        return-object
                        v-model="phone.types"
                    >
                        <template v-slot:append>
                            <v-btn
                                width="120"
                                @click="
                                    index === 0
                                        ? addPhone()
                                        : removePhone(index)
                                "
                            >
                                {{ index === 0 ? "Adicionar" : "Remover" }}
                            </v-btn>
                        </template>
                    </v-select>
                </v-col>
            </v-row>
        </div>
    </div>
</template>


<script setup>
	import { vMaska } from "maska"
	
	const { phoneMask } = useMask();
	const { minLengthValidation, maxLengthValidation } = useValidation();

	const phoneTypes = [
		{ type: "WhatsApp" },
		{ type: "Celular" },
		{ type: "Residencial" },
		{ type: "Comercial" },
	];
	const phoneRules = [
		minLengthValidation({ name: "O telefone", number: 14 }),
		maxLengthValidation({ name: "O telefone", number: 15 }),
	];

	const phones = defineModel();

	// quando carrega o componente precisa dos valores padrão vazios para não dar erro na renderização
	watchEffect(() => {
		if (!phones.value || phones.value.length === 0) {
			phones.value = [{ number: null, types: [] }];
		}
	});

	const addPhone = () => {
		phones.value.push({ number: null, types: [] });
	};

	const removePhone = (index) => {
		phones.value.splice(index, 1);
	};
</script>



