<template>
    <v-app>
        <!-- style="filter: brightness(50%);" -->
        <v-app-bar
            color="black"
            scroll-behavior="fade-image"
            absolute
            image="/images/_8900b2df-073b-4f02-9742-a172993b7a9a.jpg"
            density="prominent"
        >
            <!-- <template v-slot:image>
                <v-img
                    gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
                ></v-img>
            </template> -->

            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            
            <v-app-bar-title>IAS Software Jurídico <pre>{{ teste }}</pre></v-app-bar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>

            <template v-slot:extension>
                <v-tabs 
                    v-model="tab"
                    align-tabs="title"
                    class="mt-15"
                    height="75%"
                >
                    <v-tab
                        v-for="item in items"
                        :key="item.title"
                        :to="item.to"
                        router
                        exact
                    >
                        {{item.title}}                    
                    </v-tab>
                </v-tabs>
            </template>
    
            
        </v-app-bar>
    
        <v-main class="bg-grey-lighten-3">
            <!-- <v-container> -->
                <slot />
            <!-- </v-container> -->
        </v-main>
    </v-app>
</template>
  
<script setup>
    
    const tab = ref(null)
    const teste = ref(null)

    const items = [
        {
            title: 'Inicio',
            to: '/'
        },
        {
            title: 'Planos',
            to: '/site/plans'
        },
        {
            title: 'Registrar',
            to: '/site/register'
        },
		{
            title: 'Entrar',
            to: '/site/login'
        },
        // {
        //     title: 'Entrar',
        //     to: '/adm/'
        // },
    ]
</script>