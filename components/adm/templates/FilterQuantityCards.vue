<template>
	<v-sheet
        class="d-flex flex-wrap justify-space-evenly rounded-lg bg-grey-lighten-5"
    >
        <v-card
            v-for="index in quantityItem"
            :key="index"
            elevation="2"
            class="mx-4 my-4"
            max-width="500"
            max-height="400"
        >
            <v-alert min-width="300" color="orange-lighten-5" class="py-2">
                <h3>{{ name }} {{ index }}</h3>
            </v-alert>

            <v-card-text>
                 <AdmTemplatesFilterQuantityCustomers
				 	v-if="name === 'Pessoa Física'"
                    @update="
                        (value) =>
                            itemSelected(value, index)
                    "
                    class="mt-2 mb-4"
                ></AdmTemplatesFilterQuantityCustomers>

				<AdmTemplatesFilterQuantityCompanies
				 	v-if="name === 'Empresa'"
                    @update="
                        (value) =>
                            itemSelected(value, index)
                    "
                    class="mt-2 mb-4"
                ></AdmTemplatesFilterQuantityCompanies>

					
				<AdmTemplatesFilterQuantityItensCardsList
					v-if="templatesFiles.selected.peopleSelected[index - 1] && name === 'Pessoa Física'"
					:itemSelected="templatesFiles.selected
								.peopleSelected[index - 1]"
				></AdmTemplatesFilterQuantityItensCardsList>

				<AdmTemplatesFilterQuantityItensCardsList
					v-if="templatesFiles.selected.companiesSelected[index - 1] && name === 'Empresa'"
					:itemSelected="templatesFiles.selected
								.companiesSelected[index - 1]"
				></AdmTemplatesFilterQuantityItensCardsList>

            </v-card-text>
        </v-card>
    </v-sheet>
</template>


<script setup>
import { useTemplatesStore } from "~/stores/adm/templates";
import { useTemplatesFilesStore } from "~/stores/adm/templatesFiles";

const templates = useTemplatesStore();
const templatesFiles = useTemplatesFilesStore();

const props = defineProps({
	quantityItem: { type: Number, required: false },
	name: { type: String, required: true },
});


const keyMappings = {
    peopleSelected: {
        name: "nome",
        gender: "genero",
        cpf: "cpf",
        rg: "rg",
        address: "endereco",
        number: "numero",
        complement: "complemento",
        district: "bairro",
        city: "cidade",
        state: "estado",
        zipCode: "cep",
        email: "email",
        maritalStatus: "estado-civil",
        profession: "profissao",
        nationality: "nacionalidade",
        naturalness: "naturalidade",
        socialName: "nome-social",
        fatherName: "nome-pai",
        motherName: "nome-mae",
        rgDate: "rg-data",
        cnh: "cnh",
        cnhDate: "cnh-data",
        classEntityType: "entidade-classe",
        classEntityNumber: "numero-entidade-classe",
        classEntityState: "estado-entidade-classe",
        pis: "pis",
        passportNumber: "passaporte",
    },
    companiesSelected: {
        corporateName: "nome-empresa",
        fantasyName: "nome-fantasia",
        cnpj: "cnpj",
        email: "email-empresa",
        type: "tipo",
        address: "endereco-empresa",
        number: "numero-empresa",
        complement: "complemento-empresa",
        district: "bairro-empresa",
        city: "cidade-empresa",
        state: "estado-empresa",
        zipCode: "cep-empresa",
    },
};

// Cria os dados de peopleSelected ou companiesSelected dentro de selected
// Função itemSelected - transforma o objeto 'value' com base em um mapeamento de chaves para um tipo de seleção específico.
function itemSelected(value, index) {

	const selectedType = props.name === 'Pessoa Física' ? 'peopleSelected' : 'companiesSelected';

	// // isLoading.value = true;  // Ativa o indicador de carregamento
	// // templates.showEditor = false;  
	try {
		const { selected } = templatesFiles; // Acessa o arquivo selecionado do conjunto de templates.
		const keyMapping = keyMappings[selectedType]; // Obtém o mapeamento de chaves específico para o tipo selecionado.
		const selectedArray = selected[selectedType]; // Acessa o array do tipo selecionado no arquivo selecionado, para armazenar os valores transformados.

		// Inicializa 'templateReplaceValues' se não existir dentro de 'selected'.
		if (!selected.templateReplaceValues) {
			selected.templateReplaceValues = {};
		}

		const { templateReplaceValues } = selected;

		// Função interna para mapear uma chave e valor individuais com base no índice.
		const mapValue = (key, val, idx) => {
			// Verifica se a chave atual existe no mapeamento.
			if (keyMapping[key]) {
				// Cria uma nova chave combinando o mapeamento e o índice.
				const newKey = `${keyMapping[key]}${idx}`;
				templateReplaceValues[newKey] = val;
				// Retorna o valor e a chave formatada para o template.
				return { value: val, key: `{$${newKey}}` };
			}
			// Retorna null se a chave não estiver no mapeamento.
			return null;
		};

		// Verifica se o valor de entrada é válido (não nulo ou indefinido).
		if (value) {
			const transformedValue = {}; // Objeto para armazenar os valores transformados.

			// Processa cada entrada no objeto de valor (propriedades de nível superior).
			Object.entries(value).forEach(([key, val]) => {
				// Ignora a chave 'address', pois será tratada separadamente.
				if (key !== "address") {
					// Mapeia a chave e o valor, e adiciona ao objeto transformado se não for nulo.
					const mappedValue = mapValue(key, val, index);
					if (mappedValue) {
						transformedValue[key] = mappedValue;
					}
				}
			});

			// Trata especificamente das propriedades aninhadas dentro de 'address'.
			if (value.address && typeof value.address === "object") {
				// Processa cada entrada no objeto 'address'.
				Object.entries(value.address).forEach(([nestedKey, nestedVal]) => {
					// Mapeia a chave aninhada e o valor, e adiciona ao objeto transformado.
					const mappedValue = mapValue(nestedKey, nestedVal, index);
					if (mappedValue) {
						transformedValue[nestedKey] = mappedValue;
					}
				});
			}

			selectedArray[index - 1] = transformedValue; // Atualiza o array no índice especificado com os valores transformados.
		} else {
			selectedArray.splice(index - 1, 1); // Se o valor de entrada for nulo ou indefinido, remove o elemento correspondente do array.

			// Remove as chaves associadas do templateReplaceValues
			Object.keys(keyMapping).forEach((key) => {
				const mappedKey = `${keyMapping[key]}${index}`;
				delete templateReplaceValues[mappedKey];
			});
		}
	} finally {
        // isLoading.value = false;  // Desativa o indicador de carregamento
        // templates.showEditor = true; 
		templates.updateEditorComponent++
    }
    
}

</script>