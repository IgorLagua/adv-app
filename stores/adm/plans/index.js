import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';

export const usePlansStore = defineStore('plans', {
    state: () => ({

        data: [],
        selected: null,
        showDialogPersonalize: false,
        idSelectedPlan: null,
        processesAjustment: null,
        usersAjustment: null,

    }),
    getters,
    actions,

});



  