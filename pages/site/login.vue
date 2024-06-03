<template>  
  
    <div class="h-100">
        <span class="background h-100"></span>

		<SiteLoginForm
        />


    </div>
    
</template>


<script setup>
    definePageMeta({
        layout: 'site'
    })
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
        opacity: 0.1;
        /* transform: scale(1.1); */
    }

</style>
