
<template>
    <div>
        <v-list>
            <v-row class="mt-1 mb-1">
                <v-list-item
                    prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
                    :title="authentication.user?.name"
                    subtitle="Administrador"
                >
                    <template v-slot:append>
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn
                                    v-bind="props"
                                    size="small"
                                    variant="text"
                                    icon="mdi-dots-vertical"
                                ></v-btn>
                            </template>

                            <v-list>
                                <v-list-item
                                    title="Perfil"
                                    prepend-icon="mdi-card-account-details-outline"
                                    @click="dialog =!dialog"
                                ></v-list-item>

                                <!-- <v-list-item
                                    v-for="[icon, text, route] in user"
                                    :key="text"
                                    :title="text"
                                    :prepend-icon="icon"
                                    :value="text"
                                    :to="route"
                                ></v-list-item> -->

                                <v-list-item
                                    title="Sair"
                                    prepend-icon="mdi-home"
                                    @click="logOut"
                                ></v-list-item>
                            </v-list>
                        </v-menu>
                    </template>
                </v-list-item>
            </v-row>
        </v-list>

        <AdmLayoutsMenuLoggedUserProfile
            v-model="dialog"
        />
    </div>
</template>


<script setup>
import { useAuthenticationStore } from "~/stores/site/authentication";

const authentication = useAuthenticationStore();

// const user = [
//     ["mdi-card-account-details-outline", "Detalhes", "/adm"],
//     ["mdi-account-convert", "Editar", "/adm"],
//     ["mdi-home", "Sair", "/"],
// ];

const dialog = shallowRef(false);

// const router = useRouter();

async function logOut() {
	
    await authentication.logOutAction();

    // router.push("/site/login/");
	navigateTo("/site/login");
}
</script>