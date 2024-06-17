<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialogErrorApi" max-width="400" persistent>
            <v-card>
                <v-empty-state
                    headline="Whoops, erro"
                    title="Usuário não Autenticado"
                    text="A autenticação expirou ou outro usuário está autenticado com seus dados em uma sessão diferente."
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Alert-Stop-Warning-Error_icon.svg/240px-Alert-Stop-Warning-Error_icon.svg.png"
					action-text="Autenticar"
					@click:action="goToLogin"
				></v-empty-state>
            </v-card>
        </v-dialog>
    </div>
</template>


<script setup>
import { useAuthenticationStore } from "~/stores/site/authentication";
const authentication = useAuthenticationStore();

const dialogErrorApi = defineModel();

async function goToLogin() {
    dialogErrorApi.value = false;
	await authentication.logOutAction();
    navigateTo("/site/login");
}

</script>