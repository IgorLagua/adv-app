<template>
    <v-row justify="center">
        <v-dialog
            v-model="plans.showDialogPersonalize"
            width="500"
            transition="dialog-bottom-transition"
            activator="parent"
        >

            <v-card>
                <v-toolbar
                    color="primary"
                    title="Personalize seu plano"
                ></v-toolbar>

                <v-card-actions class="mb-1">

                    <v-col
                        align="center" 
                        justify="center"
                        cols="12"
                    >
                        <div class="font-weight-bold mb-2">
                            Escolha o plano
                        </div>

                        <v-btn-toggle
                            v-model=plans.idSelectedPlan
                            rounded="10"
                            color="deep-purple-accent-3"
                            divided
                            mandatory
                        >
                            <v-btn 
                                v-for="plan in plans.data"
                                :key="plan.id"
                                :value=plan.id
                                variant="outlined"
                                color="primary"
                                @click="selectPlan(plan.id)"
                            >
                                {{ plan.name }}
                            </v-btn>
                        </v-btn-toggle>

                        <v-divider class="my-6"></v-divider>

                        <div class="my-6">
                            Selecione o número de processos e colaboradores do escritório
                        </div>
                        

                        <SitePlansSliderPersonalize
                        ></SitePlansSliderPersonalize>
                            
                    </v-col>

                </v-card-actions>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        :to="'/site/register'"
                        router
                        exact
                        @click="plans.showDialogPersonalize = false"
                    >
                       Cadastrar
                    </v-btn>
                </v-card-actions>
 
            </v-card>
        </v-dialog>
    </v-row>
</template>
  

<script setup>
    import { usePlansStore } from '@/stores/site/plans'

    const plans = usePlansStore()

    const selectPlan = (value) => {

        const { planFound } = useFindPlan(value)
        plans.selected = planFound
        plans.idSelectedPlan = plans.selected.id
        plans.processesAjustment = plans.selected.processMonitoring
        plans.usersAjustment = plans.selected.users
        
    }

   

</script>

