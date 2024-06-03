<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar color="blue">
            <!-- <v-app-bar-title>{{
                authentication.tenants.fantasyName
            }}</v-app-bar-title> -->

            <v-app-bar-title>
                <span
                    v-for="(tenant, index) in authentication.tenants"
                    :key="tenant.id"
                >
                    {{ tenant.fantasyName
                    }}<span v-if="index < authentication.tenants.length - 1">
                        /
                    </span>
                </span>
            </v-app-bar-title>

            <template v-slot:prepend>
                <v-app-bar-nav-icon
                    @click="drawer = !drawer"
                ></v-app-bar-nav-icon>
            </template>

            <template v-slot:append>
                <v-btn icon="mdi-dots-vertical"></v-btn>
            </template>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer">
            <AdmLayoutsMenu class="mx-auto pa-2" />
        </v-navigation-drawer>

        <v-main
            class="d-flex justify-end bg-grey-lighten-4"
            style="min-height: 100vh"
        >
            <v-container :key="authentication.tenantIds">
                <slot />
            </v-container>

            <AdmCommonDialogError v-model="dialogErrorApi" />

            <AdmCommonSnackbar
                v-if="snackbar.show"
                v-model="snackbar.show"
                :title="snackbar.title"
                :subTitle="snackbar.subTitle"
                :color="snackbar.color"
                :timeout="snackbar.timeout"
                :icon="snackbar.icon"
            ></AdmCommonSnackbar>
        </v-main>
    </v-layout>
</template>

<script setup>
import { useAuthenticationStore } from "~/stores/site/authentication";
import { useSnackbarStore } from "~/stores/snackbar";

const authentication = useAuthenticationStore();
const snackbar = useSnackbarStore();

const drawer = ref(true);

const dialogErrorApi = ref(false);

watch(
    () => authentication.isAuthenticated,
    (newVal, oldVal) => {
        if (!newVal && !authentication.logoutIsLoading) {
            dialogErrorApi.value = true;
        }
    }
);
</script>

