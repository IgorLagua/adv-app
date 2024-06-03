<template>
    <div>
        <AdmLayoutsMenuLoggedUser />
        <AdmLayoutsMenuSelectTenants v-if="authentication.tenants.length > 1"/>
		<v-divider></v-divider>

		<v-list density="compact">
            <v-list-subheader class="ml-n3">Super Admin</v-list-subheader>

            <v-list-item
                title="Recursos"
                to="/adm/resources"
                rounded="lg"
                color="orange-darken-3"
            ></v-list-item>

			<v-list-item
                title="Permissões"
                to="/adm/permissions"
                rounded="lg"
                color="orange-darken-3"
            ></v-list-item>

        </v-list>
        
		<v-list density="compact">
            <v-list-subheader class="ml-n3">Cadastros</v-list-subheader>
            <!-- <div v-if="route.path !== '/'">
            <v-list-item-media class="ma-3">
                <v-img 
                    height="100%"
                    aspect-ratio="16/9"
                    cover
                    src="https://logos-download.com/wp-content/uploads/2016/03/Eaton_Corporation_logo.png" 
                    lazy-src="https://logos-download.com/wp-content/uploads/2016/03/Eaton_Corporation_logo.png"
                ></v-img>
            </v-list-item-media>
            
            <v-divider></v-divider>
        </div> -->

            <!-- <v-list-item
                title="Home"
                to="/"
                rounded="lg"
                color="orange-darken-3"
            ></v-list-item> -->

            <v-list-item
                title="Funcionários"
                to="/adm/users"
                rounded="lg"
                color="orange-darken-3"
            ></v-list-item>

            <!-- <v-list-item 
            title="Clientes"
            to="/adm/customers"
        ></v-list-item>

        <v-list-item 
            title="Empresas"
            to="/adm/companies"
        ></v-list-item> -->

            <v-list-group color="orange-darken-3" value="Cadastros">
                <template v-slot:activator="{ props }">
                    <v-list-item title="Cadastros" v-bind="props"></v-list-item>
                </template>

                <v-list-item
                    v-for="([title, route], i) in registrations"
                    :key="i"
                    :value="title"
                    :title="title"
                    :to="route"
                    rounded="lg"
                    color="orange-darken-3"
                ></v-list-item>
            </v-list-group>

            <v-list-item
                title="Modelos Padrão"
                to="/adm/templates"
                rounded="lg"
                color="orange-darken-3"
            ></v-list-item>

            <!-- <v-list-item 
            title="Página Teste`"
            to="/adm/teste"
            rounded="lg"
            color="orange-darken-3"
        ></v-list-item> -->
        </v-list>
    </div>
</template>
  
<script setup>
import { useAuthenticationStore } from "~/stores/site/authentication";

const authentication = useAuthenticationStore();
const open = ref([]);

const registrations = [
    ["Clientes", "/adm/customers"],
    ["Empresas", "/adm/companies"],
    // [
    //     "Empresas",
    //     "/adm/templates",
    // ],
];
</script>
  