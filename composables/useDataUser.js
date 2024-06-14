
const {
	requiredValidation,
	minLengthValidation,
	maxLengthValidation,
	emailValidation,
	// cpfValidation,
	// equalLengthValidation,
} = useValidation();

export function userFieldsRequired() {

	return [
		{
			cols: 12,
			type: "text",
			label: "Nome completo",
			errorMensages: null,
			rules: [
				requiredValidation({ name: "O nome completo" }),
				minLengthValidation({ name: "O nome completo", number: 2 }),
				maxLengthValidation({ name: "O nome completo", number: 70 }),
			],
			key: "name",
		},
		{
			cols: 12,
			type: "text",
			label: "E-mail",
			errorMensages: null,
			rules: [
				requiredValidation({ name: "O e-mail" }),
				emailValidation({ name: "O e-mail" }),
			],
			key: "email",
		},
		{
			cols: 12,
			type: "password",
			label: "Senha",
			errorMensages: null,
			rules: [
				// requiredValidation({ name: 'A senha' }),
				minLengthValidation({
					name: 'A senha',
					number: 6,
				}),
				maxLengthValidation({
					name: 'A senha',
					number: 16,
				}),
			],
			key: "password",
		},
	];

}


// // Outra função composable para lógica adicional
// export function useAdditionalLogic() {
//     // Implemente a lógica adicional aqui
//     return {
//         // retorno de dados ou métodos
//     };
// }


// 2. Importando e utilizando no componente Nuxt
// No seu componente Vue, você pode agora importar essas funções composable conforme necessário. Isso permite que você mantenha o seu script setup limpo e focado na lógica específica do componente.

// No componente Vue (por exemplo MyComponent.vue):

// <script setup>
// import { useUsersStore } from "~/stores/adm/users";
// import { useFormData, useAdditionalLogic } from '~/composables/formComposables';

// const users = useUsersStore();
// const openModalForm = ref(false); // Ajuste conforme necessário
// const datas = useFormData();
// const additionalLogic = useAdditionalLogic(); // Use os dados ou métodos retornados

// // Use `additionalLogic` conforme necessário no seu componente
// </script>