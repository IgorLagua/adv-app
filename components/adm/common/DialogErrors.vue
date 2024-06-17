<template>
    <div class="text-center pa-4" v-if="!authentication.logoutIsLoading">
        <v-dialog
            v-model="common.showDialogErrorApi"
            max-width="400"
            persistent
        >
            <v-card>
                <v-empty-state
                    :headline="common.headline"
                    :title="common.title"
                    :text="common.text"
                    :image="common.image"
                    :action-text="common.actionText"
                    @click:action="goBack"
                ></v-empty-state>
            </v-card>
        </v-dialog>
    </div>
</template>


<script setup>
import { useAuthenticationStore } from "~/stores/site/authentication";
import { useCommonStore } from "~/stores/common";

const authentication = useAuthenticationStore();
const common = useCommonStore();

async function goBack() {
    if (common.actionText === "Autenticar") {
        navigateTo("/site/login");
        // await authentication.logOutAction();
    }
    if (common.actionText === "Voltar") {
        navigateTo("/adm");
    }
    common.showDialogErrorApi = false;
}
</script>