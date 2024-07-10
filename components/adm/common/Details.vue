<template>
    <div class="text-center">
        <v-dialog v-model="openModalDetails" max-width="800px">
            <v-card>
                <v-progress-linear
                    v-if="isLoading"
                    indeterminate
                    color="blue"
                    :height="1"
                    class="pt-2"
                ></v-progress-linear>

                <v-card-text>
                    <template
                        v-for="(detail, detailName) in detailsItems"
                        :key="detailName"
                    >
                        <v-alert
                            border="start"
                            :title="detailName"
                            border-color="deep-purple accent-4"
                            elevation="2"
                            class="mt-3"
                        ></v-alert>

                        <v-data-table
                            :headers="headers"
                            :items="detail"
                            items-per-page="25"
                            no-data-text="Sem dados"
                            hide-default-footer
                            hide-default-header
                        >
                            <template v-slot:item.label="{ value }">
                                <p class="font-weight-bold">
                                    {{ value }}
                                </p>
                            </template>
                        </v-data-table>
                    </template>
                </v-card-text>

                <v-card-actions>
                    <v-btn
                        @click="openModalDetails = false"
                        min-width="100"
                        variant="tonal"
                        class="mr-4 mb-4 mt-n4"
                    >
                        Fechar
                    </v-btn>
                </v-card-actions>
                
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script setup>

const openModalDetails = defineModel();

const props = defineProps({
    detailsItems: { type: Object, required: true },
    isLoading: { type: Boolean, required: true },
});

const headers = [{ width: "200", key: "label" }, { key: "value" }];


// const sections = computed(() => {

//     return {
//         "Informações Pessoais": [
//             { label: "Nome", value: customers.formData.name },
//             { label: "CPF", value: customers.formData.cpf },
//             { label: "Nome Social", value: customers.formData.socialName },
//             { label: "Email", value: customers.formData.email },
//             { label: "Gênero", value: customers.formData.gender },
//             { label: "Pessoa Política", value: customers.formData.politicalPerson ? "Sim" : "Não" },
//             { label: "Estado Civil", value: customers.formData.maritalStatus },
//             { label: "Profissão", value: customers.formData.profession },
//             { label: "Nacionalidade", value: customers.formData.nationality },
//             { label: "Naturalidade", value: customers.formData.naturalness },
//             { label: "Estado de Naturalidade", value: customers.formData.naturalnessState },
//             { label: "Data de Nascimento", value: customers.formData.birthDate },
//             { label: "Nível de Educação", value: customers.formData.educationLevels, },
//             { label: "Nome do Pai", value: customers.formData.fatherName },
//             { label: "Nome da Mãe", value: customers.formData.motherName },
//             { label: "RG", value: customers.formData.rg },
//             { label: "Data de Emissão do RG", value: customers.formData.rgDate },
//             { label: "CNH", value: customers.formData.cnh },
//             { label: "Data de Emissão da CNH", value: customers.formData.cnhDate },
//             { label: "PIS", value: customers.formData.pis },
//             { label: "Número do Passaporte", value: customers.formData.passportNumber },
//             { label: "Número do RNE", value: customers.formData.rneNumber },
//             { label: "Observação", value: customers.formData.observation },
//         ],
//         "Entidades de Classe": customers.formData.classEntities?.map(
//             (entity) => ({
//                 label: entity.type,
//                 value: `Número: ${entity.number} - Estado: ${entity.state}`,
//             })
//         ),
//         Endereço: [
//             { label: "Rua", value: customers.formData.address?.address },
//             { label: "Número", value: customers.formData.address?.number },
//             { label: "Complemento", value: customers.formData.address?.complement },
//             { label: "Bairro", value: customers.formData.address?.district },
//             { label: "Cidade", value: customers.formData.address?.city },
//             { label: "Estado", value: customers.formData.address?.state },
//             { label: "CEP", value: customers.formData.address?.zipCode },
//         ],
//         "Telefones": customers.formData.phones?.map((phone) => ({
//             label: "Telefone",
//             value: `${phone.number} (${phone.types
//                 .map((type) => type.type)
//                 .join(", ")})`,
//         })),
//     };
// });



</script>
  
