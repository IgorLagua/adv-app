<template>  
  
    <div class="h-100">
        <span class="background h-100"></span>

        <div class="d-flex align-center h-100 ">
        
            <v-container>

                <v-form @submit.prevent>

                    <v-card 
                        ref="form" 
                        color="rgba(255, 255, 255, 0.9)"
                        class="mx-auto"
                        max-width="548"
                        elevation="8"
                        rounded="lg"
                        title="Registro"
                    >
                        
                        <v-divider></v-divider>

                            <v-card-text>
        
                                <v-text-field
                                    density="compact"
                                    label="Primeiro nome"
                                    placeholder="Primeiro nome"
                                    variant="outlined"
                                    clearable
                                    required
                                    hide-details="auto"
                                    class="mb-3"
                                    v-model="formData.name"
                                    :rules="[
                                        requiredValidation({name: 'O primeiro nome'}),
                                        minLengthValidation({name: 'O primeiro nome', number: 2}),
                                        maxLengthValidation({name: 'O primeiro nome', number: 10}),
                                    ]"
                                    :error-messages="errorMessages"
                                ></v-text-field>
        
                                <v-text-field
                                    density="compact"
                                    label="Sobrenome"
                                    placeholder="Sobrenome"
                                    variant="outlined"
                                    clearable
                                    required
                                    hide-details="auto"
                                    class="mb-3"
                                    v-model="formData.lastName"
                                    :rules="[
                                        requiredValidation({name: 'O sobrenome'}),
                                        minLengthValidation({name: 'O sobrenome', number: 2}),
                                        maxLengthValidation({name: 'O sobrenome', number: 50}),
                                    ]"
                                    :error-messages="errorMessages"
                                ></v-text-field>
        
                                <v-text-field
                                    density="compact"
                                    label="Telefone"
                                    placeholder="Telefone"
                                    prepend-inner-icon="mdi-cellphone"
                                    variant="outlined"
                                    clearable
                                    required
                                    hide-details="auto"
                                    class="mb-3"
                                    maxlength="15"
                                    v-maska:[phoneMask]
                                    @maska="dataPhoneMask"
                                    v-model="formData.phone"
                                    :rules="[
                                        requiredValidation({name: 'O Telefone'}),
                                        minLengthValidation({name: 'O Telefone', number: 13}),
                                        maxLengthValidation({name: 'O Telefone', number: 15}),
                                    ]"
                                    :error-messages="errorMessages"
                                ></v-text-field>
        
                                <v-text-field
                                    density="compact"
                                    label="E-mail"
                                    placeholder="E-mail"
                                    prepend-inner-icon="mdi-email-outline"
                                    variant="outlined"
                                    clearable
                                    required
                                    hide-details="auto"
                                    class="mb-3"
                                    v-model="formData.email"
                                    :rules="[
                                        requiredValidation({name: 'O e-mail'}),
                                        emailValidation({name: 'O e-mail'}),
                                    ]"
                                    :error-messages="errorMessages"
                                ></v-text-field>
        
                                <v-row>
                                    <v-col cols="12" sm="6">
        
                                        <v-text-field
                                            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                            :type="showPassword ? 'text' : 'password'"
                                            density="compact"
                                            placeholder="Senha"
                                            prepend-inner-icon="mdi-lock-outline"
                                            variant="outlined"
                                            @click:append-inner="showPassword = !showPassword"
                                            v-model="formData.password"
                                            :rules="[
                                                requiredValidation({name: 'A senha'}),
                                                minLengthValidation({name: 'A senha', number: 6}),
                                                maxLengthValidation({name: 'A senha', number: 16}),
                                            ]"
                                        ></v-text-field>
        
                                    </v-col>
                                    <v-col cols="12" sm="6">
        
                                        <v-text-field
                                            :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                            :type="showConfirmPassword ? 'text' : 'password'"
                                            density="compact"
                                            placeholder="Confirme a senha"
                                            prepend-inner-icon="mdi-lock-outline"
                                            variant="outlined"
                                            @click:append-inner="showConfirmPassword = !showConfirmPassword"
                                            v-model="formData.confirmPassword"
                                            :rules="[
                                                requiredValidation({name: 'A confirmação da senha'}),
                                                minLengthValidation({name: 'A confirmação da senha', number: 6}),
                                                maxLengthValidation({name: 'A confirmação da senha', number: 16}),
                                                passwordConfirmationError()
                                            ]"
                                        
                                        ></v-text-field>

                                    </v-col>
                                </v-row>

        
                                <v-select
                                    :items="plans.data"
                                    item-title="name"
                                    item-value="id"
                                    density="compact"
                                    label="Plano"
                                    placeholder="Plano"
                                    variant="outlined"
                                    @update:modelValue="selectPlan"
                                    v-model="plans.idSelectedPlan"
                                ></v-select>
                               
                                <SitePlansSliderPersonalize
                                ></SitePlansSliderPersonalize>
        
                            </v-card-text>
                                
                        <v-divider></v-divider>

                        <v-card-actions>
                            <!-- <v-btn text @click="resetForm"> limpar </v-btn> -->
                            <v-spacer></v-spacer>
                            <v-btn 
                                type="submit"
                                color="primary" 
                                text 
                                block 
                                @click="selectPlan(plans.idSelectedPlan)"
                            >
                                cadastrar
                            </v-btn>
                        </v-card-actions>
                        <!-- <pre> {{  formData }}</pre> -->

                    </v-card>

                </v-form>

            </v-container>
        </div>

    </div>
    
</template>


<script setup>
    import { usePlansStore } from '@/stores/site/plans'
    
    definePageMeta({
        layout: 'site'
    })

    const plans = usePlansStore()
    plans.getPlansAction('plans'); // chamar a action ao montar o componente - Pega o dados da API

    // Mascaras dos inputs --> vem da pasta composables
    const { 
        // cpfMask, 
        phoneMask,
    } = useMask()

    // Validações dos inputs --> vem da pasta composables
    const { 
        requiredValidation,
        minLengthValidation,
        maxLengthValidation,
        emailValidation,
        // cpfCnpjValidation,
        // cellPhoneValidation,
        // betweenLengthValidation,
    } = useValidation()

    const dataPhoneMask = (event) => {
        // console.log({
        //     masked: event.detail.masked,
        //     unmasked: event.detail.unmasked,
        //     completed: event.detail.completed
        // })
    }


    const formData = ref({})
    const errorMessages = ""
    const showPassword = ref(false)
    const showConfirmPassword = ref(false)
    
    const selectPlan = (value) => {
        const { planFound } = useFindPlan(value)
        plans.selected = planFound
        plans.idSelectedPlan = plans.selected.id
        plans.processesAjustment = plans.selected.processMonitoring
        plans.usersAjustment = plans.selected.users
    }


    const passwordConfirmationError = () => {
        if (
            formData.password &&
            formData.password === formData.confirmPassword
        ) {
            return true;
        } else {
            return "A senha confirmada não corresponde.";
        }
    }

</script>


<style>
    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(/images/_4cb262ec-c231-4af8-a2f8-d516d0039a5b.jpg) repeat center center
            black;
        background-size: cover;
        /* opacity: 0.5; */
        /* transform: scale(1.1); */
    }

</style>
