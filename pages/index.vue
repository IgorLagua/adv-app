<template>
    <div>
        <v-parallax
            src="/images/_5c8bbcfa-c42f-4185-9ce2-3c36cc1ea8a4.jpg"
            gradient="to top right, rgba(19,84,200,.6), rgba(128,255,199,.5)"
        >
            <div
                style="text-shadow: 2px 2px #000000"
                class="d-flex flex-column fill-height justify-center align-center text-white text-center"
            >
                <h1 class="text-h4 font-weight-thin mb-4">
                    Solução Jurídica Integrada de Excelência
                </h1>

                <h4 class="subheading">
                    Uma plataforma unificada que centraliza toda a gestão de
                    escritórios de advocacia, otimizando processos e elevando a
                    produtividade
                </h4>

                <v-btn
                    class="mt-10"
                    elevation="20"
                    variant="outlined"
                    size="x-large"
                    rounded="lg"
                    :to="'/site/plans'"
                    router
                    exact
                >
                    <div>ESCOLHA UM PLANO IDEAL</div>
                </v-btn>
            </div>
        </v-parallax>

        <v-container>
            <v-row>
                <v-col cols="12" md="6">
                    <div
                        class="d-flex flex-column fill-height justify-center align-center"
                    >
                        <h1 class="text-h4 font-weight-bold mb-4">
                            Aprimorando a Advocacia na Era Digital com ILC
                            Software Jurídico
                        </h1>
                        <p class="text-left">
                            Em um mundo onde a Advocacia 4.0 define o padrão, é
                            essencial equipar seu escritório com ferramentas
                            digitais para atender às crescentes demandas de
                            clientes online. Seja na advocacia consultiva ou na
                            representação em ações judiciais, os clientes
                            esperam o melhor. E oferecer serviços jurídicos sem
                            a ajuda da tecnologia moderna pode colocar em risco
                            sua reputação.
                        </p>
                        <br />
                        <p class="text-left">
                            Com o ILC Software Jurídico, você não apenas se
                            equipa com a melhor solução jurídica do mercado, mas
                            também recebe orientação especializada durante a
                            transição para um escritório virtual. Mergulhe em um
                            ambiente onde a tecnologia jurídica facilita cada
                            etapa, conectando tudo à velocidade da luz. Descubra
                            um equilíbrio perfeito entre máquina e humano, e
                            alcance a eficiência máxima em sua prática jurídica.
                        </p>
                    </div>
                </v-col>

                <v-col cols="12" md="6">
                    <v-img
                        src="/images/_20118c6e-bdcc-4f79-aa4d-0a4f7d2d479d.jpg"
                        cover
                    ></v-img>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "site",
});
</script>
