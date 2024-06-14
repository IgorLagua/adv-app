
<template>
    <div>
        <v-list>
            <v-row class="mt-1 mb-1">
                    <!-- prepend-avatar="https://cdn.vuetifyjs.com/images/john.png" -->
                <v-list-item
                    :title="authentication.user?.name"
                    :subtitle="authentication.user?.isAdmin ? 'Administrador' : null"
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
                                    @click="openForm"
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
import { useUsersStore } from "~/stores/adm/users";
import { useAuthenticationStore } from "~/stores/site/authentication";

const user = useUsersStore();
const authentication = useAuthenticationStore();

// const user = [
//     ["mdi-card-account-details-outline", "Detalhes", "/adm"],
//     ["mdi-account-convert", "Editar", "/adm"],
//     ["mdi-home", "Sair", "/"],
// ];

const dialog = shallowRef(false);

// const router = useRouter();

function openForm() {
    user.formData = {...authentication.user};
    dialog.value = true;
}

async function logOut() {
	
    await authentication.logOutAction();

    // router.push("/site/login/");
	navigateTo("/site/login");
}
</script>