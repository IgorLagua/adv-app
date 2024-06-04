<template>
    <div class="d-flex align-center h-100">
        <v-container>
            <v-form v-model="formIsValid" @submit.prevent>
                <v-card
                    color="rgba(255, 255, 255, 0.9)"
                    class="mx-auto"
                    max-width="500"
                    elevation="18"
                    rounded="lg"
                    title="Login"
                >
                    <v-divider></v-divider>

                    <v-container
                        class="mb-n7"
                        v-if="authentication.apiErrors.errors?.auth"
                    >
                        <v-alert
                            variant="outlined"
                            type="warning"
                            prominent
                            border="start"
                        >
                            {{ authentication.apiErrors.message }}
                        </v-alert>
                    </v-container>

                    <v-card-text>
                        <v-text-field
                            density="comfortable"
                            label="E-mail"
                            placeholder="E-mail"
                            prepend-inner-icon="mdi-email-outline"
                            class="my-6"
                            v-model="formData.email"
                            :rules="[
                                requiredValidation({ name: 'O e-mail' }),
                                emailValidation({ name: 'O e-mail' }),
                            ]"
                        ></v-text-field>

                        <v-text-field
                            :append-inner-icon="
                                showPassword ? 'mdi-eye-off' : 'mdi-eye'
                            "
                            :type="showPassword ? 'text' : 'password'"
                            density="comfortable"
                            placeholder="Senha"
                            prepend-inner-icon="mdi-lock-outline"
                            @click:append-inner="showPassword = !showPassword"
                            v-model="formData.password"
                            :rules="[
                                requiredValidation({ name: 'A senha' }),
                                minLengthValidation({
                                    name: 'A senha',
                                    number: 6,
                                }),
                                maxLengthValidation({
                                    name: 'A senha',
                                    number: 16,
                                }),
                            ]"
                        ></v-text-field>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            class="mb-2"
                            color="blue"
                            block
                            variant="elevated"
                            size="large"
                            :loading="isLoading"
                            :disabled="!formIsValid"
                            @click="submitFormData"
                        >
                            entrar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-container>
    </div>
</template>

<script setup>
import { useAuthenticationStore } from "~/stores/site/authentication";
const authentication = useAuthenticationStore();

authentication.tenants = null; // como estou gravando a loja authentication no cookie do navegador e quero toda vez que atulizar a pagina os tenants seja nullos, criei esse código.

// Validações dos inputs --> vem da pasta composables
const {
    requiredValidation,
    minLengthValidation,
    maxLengthValidation,
    emailValidation,
} = useValidation();

const formData = ref({
//     email: "igor.lagua@hotmail.com",
//     password: "password",
    email: null,
    password: null,
});
const showPassword = ref(false);
const formIsValid = ref(false);

const isLoading = ref(false);
const authenticationError = ref(false);
// const router = useRouter();
async function submitFormData() {
    if (formIsValid.value) {
        isLoading.value = true;
        await authentication.loginAction(formData.value);

        if (Object.values(authentication.apiErrors).length === 0) {
            authenticationError.value = false;
            // router.push("/adm/");
			navigateTo("/adm/");
        } else {
            // Remove o cookies do navegador se existir erro no retorno da API
            const cookie = useCookie("authentication");
            cookie.value = null;

            authenticationError.value = true;
        }
        isLoading.value = false;
    }
}
</script>

