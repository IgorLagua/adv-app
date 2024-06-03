<template>
    <div>
        <v-dialog v-model="dialog" max-width="600">
            <v-card prepend-icon="mdi-account" title="Perfil">
                <v-card-text>
                    <v-row dense>
                        <v-col
                            v-for="data in dataFieldsRequired"
                            :key="data.label"
                            :cols="data.cols"
                            :sm="data.sm"
                            :md="data.md"
                        >
                            <AdmCommonFormDefault
                                :data="data"
                                v-model="users.formData[data.key]"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        text="Fechar"
                        variant="plain"
                        @click="dialog = false"
                    ></v-btn>

                    <v-btn
                        color="primary"
                        text="Salvar"
                        variant="tonal"
                        @click="dialog = false"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { useUsersStore } from "~/stores/adm/users";

const users = useUsersStore();

const dialog = defineModel();

// Dados dos inputs com Validações --> vem da pasta composables/useDataUser
const dataFieldsRequired = userFieldsRequired();


</script>