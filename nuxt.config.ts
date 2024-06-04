// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: true,

	runtimeConfig: {
		public: {
			apiBase: 'https://api.iasapp.com.br/'
		}
	},


	modules: [
		'vuetify-nuxt-module',				// Configuração --> https://vuetify-nuxt-module.netlify.app/guide/
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
	],

	vuetify: {

		moduleOptions: {
			// vuetifyOptions: {

			//   /* nuxt-vuetify module options */    
			//   treeshaking: true | false,    
			//   useIconCDN: true | false,

			//   /* vite-plugin-vuetify options */    
			//   styles: true | 'none' | 'expose' | 'sass' | { configFile: string },    
			//   autoImport: true | false,
			//   useVuetifyLabs: true | false, 
			// useVuetifyLabs: true, 

		},

		/* vuetify options */
		vuetifyOptions: {

			defaults: {
				VTextField: {               //https://www.youtube.com/watch?v=1yGof4OTDtY&t=297s
					variant: "outlined",
					color: "primary",
					density: "compact",
					clearable: true,
					hideDetails: "auto"
				},
				VSelect: {
					variant: "outlined",
					color: "primary",
					density: "compact",
					clearable: true,
					hideDetails: "auto"
				},
				VAutocomplete: {
					variant: "outlined",
					color: "primary",
					density: "compact",
					clearable: true,
					hideDetails: "auto"
				},
				VTextarea: {
					variant: "outlined",
					color: "primary",
					density: "compact",
					clearable: true,
					autoGrow: true,
					hideDetails: "auto",
					rows: "2"
				},
				VDataTableFooter: {
					VSelect: {
						clearable: false,
					},
				},

				VMessages: {
					color: "red-lighten-3"
				}
			},

			// locale: {
			//     locale: 'pt',
			//     fallback: 'pt',
			//     messages: { pt }
			// },

		},
	}
})