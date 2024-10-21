// import { defineStore } from 'pinia'

// export const useSnackbarStore = defineStore('snackbar', {

// 	state: () => ({
// 		show: false,
// 		title: "Cadastrado com sucesso",
// 		subTitle: "Cadastrado com sucesso",
// 		color: "green",
// 		timeout: 4000,
// 		icon: "mdi-checkbox-marked-circle-outline",

// 		notification: {
// 			show: false,
// 			color: '',
// 			title: '',
// 			subTitle: '',
// 			timeout: 5000,
// 			icon: '',
// 		},

// 	}),

// 	actions: {
// 		setNotification(color, title, subTitle = '', timeout = 5000, icon = '') {
// 			this.notification.show = true;
// 			this.notification.color = color;
// 			this.notification.title = title;
// 			this.notification.subTitle = subTitle;
// 			this.notification.timeout = timeout;
// 			this.notification.icon = icon;
// 		},
// 		// closeNotification() {
// 		// 	this.notification.show = false;
// 		// },
// 	},

// 	getters: {
// 		getNotification: (state) => state.notification,
// 	},
// })



// https://stackoverflow.com/questions/62807350/want-to-use-vuetify-snackbar-as-a-global-custom-component-in-vuejs