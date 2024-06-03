<template>
    
    <div>

        <v-data-iterator
            :items="plans.data"
        >

            <template v-slot:header>
                <v-toolbar 
                    :elevation="8" 
                    class="my-6"
                    color="indigo darken-5"
                >
                    <v-toolbar-title align="center">
                        Escolha o plano ideal para seu escritório de advocacia
                    </v-toolbar-title>
                </v-toolbar>
            </template>

            <template v-slot:default="{ items }">
                <v-row class="justify-center mb-6">
                    <v-col
                        v-for="item in items"
                        :key="item.raw.id"
                        cols="12"
                        sm="6"
                        md="4"
                        lg="3"
                    >
                        <v-card class="fill-height">
                            <v-card-title class="subheading font-weight-bold d-flex align-center justify-space-between">
                                {{ item.raw.name }}
                            </v-card-title>

                            <v-divider></v-divider>

                            <v-list density="compact">
                                
                                <v-list-item title="Usuários:">
                                    <template v-slot:append>
                                        <p class="text-disabled">
                                            {{ item.raw.users }}
                                        </p>
                                    </template>
                                </v-list-item>

                                <v-list-item title="Monitoramento de processos:">
                                    <template v-slot:append>
                                        <p class="text-disabled">
                                            {{ item.raw.processMonitoring }}
                                        </p>
                                    </template>
                                </v-list-item>

                                <v-list-item title="Controle de tarefas:">
                                    <template v-slot:append>
                                        <p class="text-disabled">
                                            {{ item.raw.taskControl }}
                                        </p>
                                    </template>
                                </v-list-item>

                                <v-list-item title="Sistema de alertas:">
                                    <template v-slot:append>
                                        <p class="text-disabled">
                                            {{ item.raw.alertSystem }}
                                        </p>
                                    </template>
                                </v-list-item>

                                <v-list-item title="Finaneiro:">
                                    <template v-slot:append>
                                        <p class="text-disabled">
                                            {{ item.raw.financial }}
                                        </p>
                                    </template>
                                </v-list-item>

                                <v-list-item title="Preço:">
                                    <template v-slot:append>
                                        <p class="text-disabled">
                                            {{ item.raw.price }} / mês
                                        </p>
                                    </template>
                                </v-list-item>

                                <v-container 
                                    align="center"
                                    justify="center"
                                >
                                    <v-btn
                                        size="large"
                                        block
                                        elevation="12"
                                        color="primary"
                                        :to="'/site/register'"
                                        router
                                        exact
                                        @click="selectPlan(item.raw.id)"
                                    >
                                        Contratar
                                    </v-btn>
                                        <br>
                                    <v-btn
                                        block
                                        prepend-icon="mdi-file-document-edit-outline"
                                        @click="showDialogPersonalize(item.raw.id)"
                                    >
                                        Personalizar
                                    </v-btn>
                                </v-container>

                            </v-list>

                        </v-card>
                    </v-col>
                </v-row>
            </template>
           
        </v-data-iterator>
       
        <v-parallax 
            src="/images/_f40272aa-3202-44f9-b7b5-8d29c916e6f3.jpg"
            gradient="to top right, rgba(33,19,13,.8), rgba(33,19,13,.5)"
            height="350"
            scale="0.8"
            class="my-5"
        >

            <div class="d-flex fill-height justify-center align-center text-white">
                <v-col
                    align="center"
                    cols="6"
                >
                    <h1 class="text-h3 font-weight-thin mb-4">
                        Personalize seu plano
                    </h1>
                    <h4 class="subheading">
                        Temos o plano ideal para o seu escritório!
                    </h4>

                    
                    <div class="my-8">
                        <v-btn
                            block
                            size="x-large"
                            variant="tonal"
                            prepend-icon="mdi-file-document-edit-outline"
                            @click="showDialogPersonalize('8451a31e-8447-46a5-8fa7-000000000011')"
                        >
                            Personalizar
                        </v-btn>
                        
                    </div>
                </v-col>
                
            </div>
    
        </v-parallax>

        <!-- <pre>{{ data.data }}</pre> -->
<!-- <pre>{{ plansData.data }}</pre> -->
        <SitePlansDialogPersonalize
            
        ></SitePlansDialogPersonalize>

    </div>
</template>


<script setup>
    import { usePlansStore } from '@/stores/site/plans'
    
    definePageMeta({
        layout: 'site'
    })

    const plans = usePlansStore()

    plans.getPlansAction('plans'); // chamar a action ao montar o componente - Pega o dados da API

    const selectPlan = (value) => {
        const { planFound } = useFindPlan(value)
        plans.selected = planFound
        plans.idSelectedPlan = plans.selected.id
        plans.processesAjustment = plans.selected.processMonitoring
        plans.usersAjustment = plans.selected.users
    }

    const showDialogPersonalize = (value) => {
        selectPlan(value)
        plans.showDialogPersonalize = true
    }

</script>




