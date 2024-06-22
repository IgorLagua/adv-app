<template>
    <div>
        <AdmLayoutsMenuLoggedUser />
        <AdmLayoutsMenuSelectTenants v-if="authentication.tenants.length > 1" />
        <v-divider></v-divider>

        <v-list density="compact">

            <div v-if="isSuperAdmin()">
                
				<v-list-subheader class="ml-n3">Super Admin</v-list-subheader>

				<v-list-item
                    v-for="([title, route], i) in itemsSuperAdmin"
                    :key="i"
                    :title="title"
                    :value="title"
                    :to="route"
                    rounded="lg"
                    color="orange-darken-3"
                ></v-list-item>

                <v-divider class="mt-2"></v-divider>
            </div>


            <v-list-subheader class="ml-n3">Cadastros</v-list-subheader>

            <v-list-group color="orange-darken-3" value="Cadastros">
                <template v-slot:activator="{ props }">
                    <v-list-item title="Cadastros" v-bind="props"></v-list-item>
                </template>

                <v-list-item
                    v-for="([title, route], i) in filteredItems"
                    :key="i"
                    :title="title"
                    :value="title"
                    :to="route"
                    rounded="lg"
                    color="orange-darken-3"
                ></v-list-item>
            </v-list-group>

            <v-list-item
				v-if="hasPermission('template', 'index')"
                title="Modelos Padrão"
                to="/adm/templates"
                rounded="lg"
                color="orange-darken-3"
            ></v-list-item>

        </v-list>
    </div>
</template>
  
<script setup>
import { useAuthenticationStore } from "~/stores/site/authentication";

const authentication = useAuthenticationStore();

const itemsSuperAdmin = [
    ["Recursos", "/adm/resources"],
    ["Permissões", "/adm/permissions"],
];

const items = [
    ["Usuários", "/adm/users"],
    ["Clientes", "/adm/customers"],
    ["Empresas", "/adm/companies"],
];

const filteredItems = computed(() => {
  return items.filter(([title, route]) => {
    if (title === "Usuários" && isAdmin()) {
      return true;
    }
    if (title === "Clientes" && hasPermission('customer', 'index')) {
      return true;
    }
    if (title === "Empresas" && hasPermission('company', 'index')) {
      return true; 
    }
    return false;
  });
});


</script>

