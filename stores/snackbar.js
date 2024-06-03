import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('snackbar', {
    
    state: () => ({
		show: false,
		title: "Cadastrado com sucesso",
		subTitle: "Cadastrado com sucesso",
		color: "green",
		timeout: 4000,
		icon: "mdi-checkbox-marked-circle-outline",
        
    }),
    
    
    actions: {
    
        

    },
})

