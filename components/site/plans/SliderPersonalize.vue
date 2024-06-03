<template>

    <div v-if="plans.selected">

        <v-slider
            v-model="plans.processesAjustment"
            label="Processos"
            step="100"
            :min="plans.selected.processMonitoring"
            :max="plans.selected.processMonitoringMax"
        >
            <template v-slot:append>
                <div>{{ plans.processesAjustment }}</div>
            </template>
        </v-slider>

        <v-slider
            v-model="plans.usersAjustment"
            label="Acessos"
            step="1"
            :min="plans.selected.users"
            :max="plans.selected.usersMax"
        >
            <template v-slot:append>
                <div>{{ plans.usersAjustment }}</div>
            </template>
        </v-slider>

        <v-card-text class="mt-5">
            <v-row justify="end" class=" align-end">
                <div class="font-weight-bold text-h4 text-disabled"> {{pricePlan}} </div>
                <div class="light-blue--text">/mês</div>
            </v-row>
            <v-row justify="end">
                <div>Mais taxa de ativação</div>
            </v-row>
        </v-card-text>

    </div>
    
    
</template>
  

<script setup>
    import { usePlansStore } from '@/stores/site/plans'

    const plans = usePlansStore()

    const pricePlan = computed(() => {

        const totalPriceProcess = (plans.processesAjustment - plans.selected.processMonitoring) * plans.selected.processMonitoringPrice 
        const totalPriceUsers = (plans.usersAjustment - plans.selected.users) * plans.selected.userPrice 

        const price = parseInt(plans.selected.price) + totalPriceProcess + totalPriceUsers
        return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    })

</script>

