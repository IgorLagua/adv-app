
const actions = {
	async loginAction(formData) {

		const endpoint = 'login';
		const options = {
			method: 'POST',
			body: formData
		};

		const { data, error } = await useApi(endpoint, options);

		if (data) {
			this.apiErrors = {}
			this.token = data.token
			this.user = data.user
			this.tenants = data.tenants
			this.tenantIds = data.tenants.map(tenant => tenant.id);
			this.isAuthenticated = true
		}

		else {
			this.token = null
			this.user = null
			this.tenants = []
			this.tenantIds = []
			this.isAuthenticated = false
			this.apiErrors = error
		}

	},

	async logOutAction() {

		const endpoint = 'logout';
		const options = {
			method: 'POST',
		};

		const { data, error } = await useApi(endpoint, options);

		// console.log('data', data);

		// if (data) {
			this.token = null
			this.user = null
			this.tenants = []
			this.tenantIds = []
			this.isAuthenticated = false
			this.apiErrors = {}
		// }

	},
};
export default { ...actions };