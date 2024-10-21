import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {

	state: () => ({

		// notification: {
		show: false,
		color: 'green',
		title: 'Cadastrado com sucesso',
		subTitle: 'Cadastrado com sucesso',
		timeout: 5000,
		icon: 'mdi-checkbox-marked-circle-outline',
		// },

	}),

	actions: {
		setNotification(color, title, subTitle, timeout, icon) {
			this.show = true;
			this.color = color;
			this.title = title;
			this.subTitle = subTitle;
			this.timeout = timeout;
			this.icon = icon;
		},
		// closeNotification() {
		// 	this.notification.show = false;
		// },
	},

	// getters: {
	// 	getNotification: (state) => state,
	// },
})



// https://stackoverflow.com/questions/62807350/want-to-use-vuetify-snackbar-as-a-global-custom-component-in-vuejs