<template>
    <v-select
        v-if="authentication.tenants && Array.isArray(authentication.tenants)"
        density="compact"
        label="Empresas"
        placeholder="Empresa"
        class="my-2"
        v-model="tenantsIdSelected"
        @update:menu="updateMenu"
        :items="authentication.tenants"
        item-title="fantasyName"
        item-value="id"
        :rules="[requiredValidation({ name: 'A empresa' })]"
        multiple
        :clearable="false"
        chips
    >
        <template v-slot:prepend-item>
            <v-list-item title="Selecionar tudo" @click="toggle">
                <template v-slot:prepend>
                    <v-checkbox-btn
                        :color="someCompanies ? 'indigo-darken-4' : undefined"
                        :indeterminate="someCompanies && !allCompanies"
                        :model-value="allCompanies"
                    ></v-checkbox-btn>
                </template>
            </v-list-item>
            <v-divider class="mt-1"></v-divider>
        </template>
    </v-select>
</template>


<script setup>
import { useAuthenticationStore } from "~/stores/site/authentication";

const authentication = useAuthenticationStore();

const { requiredValidation } = useValidation();

const tenantsIdSelected = ref([]);

const allCompanies = computed(() => {
    if (authentication.tenants) {
        return tenantsIdSelected.value.length === authentication.tenants.length;
    }
});

const someCompanies = computed(() => {
    return tenantsIdSelected.value.length > 0;
});

function toggle() {
    if (allCompanies.value) {
        tenantsIdSelected.value = [];
    } else {
        tenantsIdSelected.value = authentication.tenants.map(
            (tenant) => tenant.id
        );
    }
}

// Quando entra no componente carrega os tenants no select
tenantsIdSelected.value = authentication.tenantIds

// Quando seleciona as empresas e fecha o select, atualiza tenantIds no authentication
const updateMenu = (value) => {
    if (!value) {
		authentication.tenantIds = tenantsIdSelected.value
    }
};

</script>