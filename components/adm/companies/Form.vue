<template>
    <div>
        <div class="text-center">
            <v-dialog v-model="companies.openModalForm">
                <v-card>
                    <v-card-title>
                        <span class="text-h5 d-flex align-center flex-column">{{
                            title
                        }}</span>
                    </v-card-title>

                    <v-progress-linear
                        v-if="progressLinearIsLoading"
                        indeterminate
                        color="blue"
                        :height="6"
                    ></v-progress-linear>

                    <div>
                        <v-stepper v-model="step" :items="itemsStep">
                            <template v-slot:item.1>
                                <h3 class="text-h6">
                                    Cadastro dos Itens Obrigatórios
                                </h3>

                                <br />

                                <v-form ref="form1">
                                    <v-row>
                                        <v-col
                                            v-for="data in companyDataRequired"
                                            :key="data.label"
                                            :cols="data.cols"
                                            :sm="data.sm"
                                            :md="data.md"
                                        >
                                            <AdmCommonFormDefault
                                                :data="data"
                                                v-model="
                                                    companies.formData[data.key]
                                                "
                                                @update="updateCompany"
                                            />
                                        </v-col>
                                    </v-row>

                                    <!-- v-if="teste" -->
                                    <AdmCompaniesFormDynamicAutocomplete
                                        v-model="companies.formData.customers"
                                    ></AdmCompaniesFormDynamicAutocomplete>
                                </v-form>
                            </template>

                            <template v-slot:item.2>
                                <h3 class="text-h6">Cadastro1 do Endereço</h3>

                                <br />

                                <v-form ref="form2">
                                    <v-row>
                                        <v-col
                                            v-for="data in addressDataRequired"
                                            :key="data.label"
                                            :cols="data.cols"
                                            :sm="data.sm"
                                            :md="data.md"
                                        >
                                            <AdmCommonFormDefault
                                                :data="data"
                                                v-model="
                                                    companies.formData.address[
                                                        data.key
                                                    ]
                                                "
                                                @update="updateAddress"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </template>

                            <template v-slot:item.3>
                                <h3 class="text-h6">Cadastro de Telefones</h3>

                                <br />

                                <v-form ref="form3">
                                    <v-col>
                                        <AdmCommonFormPhoneDynamic
                                            v-model="companies.formData.phones"
                                        />
                                    </v-col>
                                </v-form>
                            </template>

                            <template v-slot:item.4>
                                <h3 class="text-h6">
                                    Cadastro de Itens Opcionais
                                </h3>

                                <br />

                                <v-form ref="form4">
                                    <v-row>
                                        <v-col
                                            v-for="data in companyDataOptional"
                                            :key="data.label"
                                            :cols="data.cols"
                                            :sm="data.sm"
                                            :md="data.md"
                                        >
                                            <AdmCommonFormDefault
                                                :data="data"
                                                v-model="
                                                    companies.formData[data.key]
                                                "
                                            />
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </template>

                            <template v-slot:actions>
                                <AdmCommonFormStepperButtons
                                    :saveDisabled="saveDisabled"
                                    :nextDisabled="nextDisabled"
                                    :isLoading="isLoading"
                                    v-model:step="step"
                                    @clearStepForm="clearStepForm"
                                    @closeForm="closeForm"
                                    @saveButton="saveButton"
                                    @nextButton="nextButton"
                                ></AdmCommonFormStepperButtons>
                            </template>
                        </v-stepper>
                    </div>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>


<script setup>
import { useCompaniesStore } from "~/stores/adm/companies";
import { useAddressesStore } from "~/stores/adm/addresses";
import { usePhonesStore } from "~/stores/adm/phones";
import { useCnpjStore } from "~/stores/cnpj";
import { useZipCodeStore } from "~/stores/zipCode";
import { useSnackbarStore } from "~/stores/snackbar";

const companies = useCompaniesStore();
const addresses = useAddressesStore();
const phones = usePhonesStore();
const cnpj = useCnpjStore();
const zipCode = useZipCodeStore();
const snackbar = useSnackbarStore();

const { updateErrorMessages } = useApiErrorMessages();

const props = defineProps({
    title: { type: String, required: false },
    companyId: { type: String, required: false },
});

// Dados dos inputs com Validações --> vem da pasta composables/useDataCompany
const companyDataRequired = ref(companyFieldsRequired());
const companyDataOptional = ref(companyFieldsOptional());

const addressDataRequired = ref(addressFieldsRequired());

async function updateCompany(value) {
    companyDataRequired.value[0].loading = true;
    await cnpj.getCnpjAction(value);
    companyDataRequired.value[0].loading = false;

    if (Object.values(cnpj.apiErrors).length !== 0) {
        //Se tem erro da API
        companyDataRequired.value[0].errorMensages = "CNPJ não encontrado";
        companies.formData.corporateName = null;
        companies.formData.fantasyName = null;
        companies.formData.type = null;
        companies.formData.address.zipCode = null;
    } else {
        companies.formData.address.zipCode = cnpj.formData.cep;
        companies.formData.corporateName = formatTextToFirstUpperCase(
            cnpj.formData.razao_social
        );
        companies.formData.fantasyName = formatTextToFirstUpperCase(
            cnpj.formData.nome_fantasia
        );
        companies.formData.type = formatTextToFirstUpperCase(
            cnpj.formData.descricao_identificador_matriz_filial
        );
    }
}

async function updateAddress(value) {
    addressDataRequired.value[0].loading = true;
    await zipCode.getZipCodeAction(value);
    addressDataRequired.value[0].loading = false;

    if (zipCode.formData.erro) {
        addressDataRequired.value[0].errorMensages = "CEP não encontrado";
        companies.formData.address.address = null;
        companies.formData.address.district = null;
        companies.formData.address.city = null;
        companies.formData.address.state = null;
        companies.formData.address.number = null;
        companies.formData.address.complement = null;
    } else {
        companies.formData.address.address = zipCode.formData.logradouro;
        companies.formData.address.district = zipCode.formData.bairro;
        companies.formData.address.city = zipCode.formData.localidade;
        companies.formData.address.state = zipCode.formData.uf;
        companies.formData.address.number = cnpj.formData.numero;
        companies.formData.address.complement = cnpj.formData.complemento;
    }
}

const step = ref(1);

function clearStepForm(step) {
    const clearFields = (fields, formDataObj) => {
        fields.forEach((field) => {
            if (field.key in formDataObj) {
                formDataObj[field.key] = null;
            }
        });
    };

    switch (step) {
        case 1:
            clearFields(companyDataRequired.value, companies.formData);
            companies.formData.customerId = null;
            getCustomersItens();
            break;
        case 2:
            companies.formData.address = {};
            break;
        case 3:
            companies.formData.phones = [];
            break;
        case 4:
            clearFields(companyDataOptional.value, companies.formData);
            break;
    }
}

function closeForm() {
    companies.openModalForm = false;
}

const itemsStep = [
    "Itens obrigatórios",
    "Endereço",
    "Telefones",
    "Itens opcionais",
];

const form1 = ref(null);
const form2 = ref(null);
const form3 = ref(null);
const form4 = ref(null);

const isLoading = ref(false);
const progressLinearIsLoading = ref(false);

onMounted(async () => {
    if (props.title === "Cadastro Empresa") {
        companies.formData.customers = [null];
    }
    else if (props.title === "Editar Empresa") {
        progressLinearIsLoading.value = true;
        // await sleep(3000)
        // Carrega o representante legal da empresa
        await companies.showApiAction(props.companyId);

        if (companies.formData.customers?.length === 0) {
            companies.formData.customers = [null];
        }
        progressLinearIsLoading.value = false;
    }
});

async function saveButton() {
    let index = null;
    if (companies.formData.id) {
        index = companies.data.findIndex(
            (el) => el.id === companies.formData.id
        );
    }

    if (step.value === 1) {
        isLoading.value = true;

        let formData = {};
        companyDataRequired.value.forEach((value) => {
            formData[value.key] = companies.formData[value.key];
        });

        // Remover valores nulos ou vazios de companies.formData.customers
        const cleanedCustomers = companies.formData.customers.filter(
            (item) => item != null && item !== ""
        );

        // Compara se companies.formData.customers é igual a companies.legalRepresentatives
        const comparisonIsEqual = compareValues(
            cleanedCustomers,
            companies.legalRepresentatives
        );

        // Se for diferente cadastra novamente
        if (!comparisonIsEqual) {
            // console.log("comparisonIsEqual", comparisonIsEqual);
            // Função para atualizar customerIds baseado no valor de companies.formData.customers
            const ulidCustomers = companies.formData.customers.filter((item) =>
                isUlidVariable(item)
            );
            // Filtrar objetos com chave id que são ULIDs
            const objectCustomers = companies.formData.customers
                .filter(
                    (item) =>
                        typeof item === "object" && isUlidVariable(item?.id)
                )
                .map((item) => item.id);

            // Combinar os dois arrays, se houver ULIDs
            formData.customerIds = [...ulidCustomers, ...objectCustomers];

            // console.log("formData.customerIds", formData.customerIds);
        }

        if (companies.formData.id) {
            formData.id = companies.formData.id;
            await companies.updateApiAction(formData);
        } else {
            await companies.storeApiAction(formData);
        }

        isLoading.value = false;

        // Verifica se existem erros de API retornados.
        if (Object.values(companies.apiErrors).length !== 0) {
            // Mapeia os erros da API para os campos do formulário.
            updateErrorMessages(companies.apiErrors, companyDataRequired.value);
        } else {
            if (Object.keys(companies.formData.address).length === 0) {
                companies.formData.address.zipCode = cnpj.formData.cep;
                if (companies.formData.address.address) {
                    formatTextToFirstUpperCase(cnpj.formData.logradouro);
                }
                companies.formData.address.number = cnpj.formData.numero;
                companies.formData.address.state = cnpj.formData.uf;
                if (companies.formData.address.complement) {
                    formatTextToFirstUpperCase(cnpj.formData.complemento);
                }
                if (companies.formData.address.district) {
                    formatTextToFirstUpperCase(cnpj.formData.bairro);
                }
                if (companies.formData.address.city) {
                    formatTextToFirstUpperCase(cnpj.formData.municipio);
                }
            }
            callSnackbar(companies.formData.corporateName);
            nextButton();
        }
    }

    if (step.value === 2) {
        isLoading.value = true;

        let formData = {};

        formData = companies.formData.address;

        formData.id = companies.formData.id; //pega o ultimo cliente cadastrado e insere no formData
        formData.type = "company";
        await addresses.storeApiAction(formData);

        // Verifica se existem erros de API retornados.
        if (Object.values(addresses.apiErrors).length !== 0) {
            // Mapeia os erros da API para os campos do formulário.
            updateErrorMessages(addresses.apiErrors, addressDataRequired.value);
        } else {
            callSnackbar("Endereço");
            nextButton();
        }
        isLoading.value = false;
    }

    if (step.value === 3) {
        isLoading.value = true;

        let formData = {};

        formData.phones = companies.formData.phones;

        formData.id = companies.formData.id; //pega o ultimo cliente cadastrado e insere no formData
        formData.type = "company";

        // Se já foi salvo o telefone e o formulario de cadastro esta vazio, apaga o telefone do cliente
        if (
            companies.data[index].phones.length > 0 &&
            companies.formData.phones.length === 1 &&
            !companies.formData.phones[index].number
        ) {
            await phones.destroyApiAction({ ...formData });
        }
        // Cria o telefone se não tem telefone no cliente
        else if (companies.data[index].phones.length === 0) {
            await phones.storeApiAction({ ...formData });
        }
        // Se já tem telefone, faz o update
        else {
            await phones.updateApiAction({ ...formData });
        }

        // Verifica se existem erros de API retornados.
        if (Object.values(phones.apiErrors).length !== 0) {
            // Mapeia os erros da API para os campos do formulário.
            updateErrorMessages(phones.apiErrors, phones.fieldConfig);
        } else {
            callSnackbar("Telefones");
            nextButton();
        }
        isLoading.value = false;
    }

    if (step.value === 4) {
        isLoading.value = true;

        await companies.updateApiAction(companies.formData);

        // Verifica se existem erros de API retornados.
        if (Object.values(companies.apiErrors).length !== 0) {
            // Mapeia os erros da API para os campos do formulário.
            updateErrorMessages(companies.apiErrors, companyDataOptional.value);
        } else {
            callSnackbar("Dados opcionais");
        }
        isLoading.value = false;
    }
}

const nextDisabled = computed(() => {
    let index = null;
    if (companies.formData.id) {
        index = companies.data.findIndex(
            (el) => el.id === companies.formData.id
        );
    }

    if (step.value === 1 && form1.value?.isValid && companies.formData.id) {
        // return !form1.value.isValid;
        return false;
    } else if (
        step.value === 2 &&
        form2.value?.isValid &&
        Object.keys(companies.data[index].address).length !== 0
    ) {
        return false;
    } else if (step.value === 3 && form2.value?.isValid) {
        return false;
    }
    return true; // Desabilita o botão por padrão se nenhuma condição acima for atendida
});

const saveDisabled = computed(() => {
    let index = null;
    if (companies.formData.id) {
        index = companies.data.findIndex(
            (el) => el.id === companies.formData.id
        );
    }

    if (step.value === 1 && form1.value?.isValid) {
        // Verifica se o campo 'id' não existe em companies.formData
        if (!("id" in companies.formData)) {
            return false; // Retorna falso para habilitar o botão
        }

        if (index >= 0) {
            for (let i = 0; i < companyDataRequired.value.length; i++) {
                const data = companyDataRequired.value[i];
                if (
                    companies.formData[data.key] !==
                    companies.data[index][data.key]
                ) {
                    return false; // Retorna falso para habilitar o botão
                }
            }
        }

        // Remover valores nulos ou vazios de companies.formData.customers
        const cleanedCustomers = companies.formData.customers.filter(
            (item) => item != null && item !== ""
        );

        // Compara se companies.formData.customers é igual a companies.legalRepresentatives
        return compareValues(cleanedCustomers, companies.legalRepresentatives);
    }

    if (step.value === 2 && form2.value?.isValid) {
        // Se companies.formData.address for nulo, habilita o botão
        if (!companies.formData.address) {
            return false; // Retorna falso para habilitar o botão
        } else {
            //Se qualquer campo for diferente, habilita o botão
            for (let i = 0; i < addressDataRequired.value.length; i++) {
                const data = addressDataRequired.value[i];

                let addressFormData = companies.formData.address[data.key];
                let addressData = companies.data[index].address[data.key];

                if (
                    addressFormData !== addressData &&
                    !(addressFormData === null && addressData === "") &&
                    !(addressFormData === "" && addressData === null)
                ) {
                    return false; // Retorna falso para habilitar o botão
                }
            }
        }
    }

    if (step.value === 3 && form3.value?.isValid) {
        // Verifica se todos os números em companies.formData.phones não são nulos e vazios
        const nunbersPhonesFormValid = companies.formData.phones.every(
            (phone) => phone.number && phone.number.trim() !== ""
        );

        // Verifica se os arrays são diferentes para habilitar o botão
        const comparisonIsEqual = compareValues(
            companies.data[index].phones,
            companies.formData.phones
        );

        if (!comparisonIsEqual && nunbersPhonesFormValid) {
            return false; // Retorna falso para habilitar o botão
        }

        if (comparisonIsEqual && !nunbersPhonesFormValid) {
            return false; // Retorna falso para habilitar o botão
        }

        // Se tinha telefone e foi acionado o botão limpar do formulario, pode salvar o telefone vazio
        if (
            companies.data[index].phones.length > 0 &&
            companies.formData.phones.length === 1 &&
            !companies.formData.phones[index].number
        ) {
            return false; // Retorna falso para habilitar o botão
        }
    }

    if (step.value === 4 && form4.value?.isValid) {
        
		const compareData = compareValues(
                companies.data[index],
                companies.formData
            );

			if ( !compareData ) return false

		
		// for (let i = 0; i < companyDataOptional.value.length; i++) {
        //     const data = companyDataOptional.value[i];

        //     // Verifica se existe valor em companies.data[index][data.key]
        //     // e não existe valor em companies.formData[data.key]
        //     if (
        //         companies.data[index][data.key] &&
        //         !companies.formData[data.key]
        //     ) {
        //         return false;
        //     }

        //     // Se qualquer campo tiver valor e esse valor for diferente de vazio
        //     // e diferente do gravado em companies.data[index], habilitar o botão
        //     if (
        //         companies.formData[data.key] &&
        //         companies.formData[data.key] !== "" &&
        //         companies.formData[data.key] !== companies.data[index][data.key]
        //     ) {
        //         return false; // Retorna falso para habilitar o botão
        //     }
        // }
    }

    // Desabilita o botão por padrão se nenhuma condição acima for atendida
    return true;
});

// function compareArrays(array1, array2) {
//     if (array1.length !== array2.length) {
//         return false;
//     }

//     function hashObject(obj) {
//         // Cria uma string única baseada nos valores do objeto
//         return JSON.stringify(obj, Object.keys(obj).sort());
//     }

//     function createFrequencyMap(array) {
//         const freqMap = {};
//         array.forEach((item) => {
//             const hash = hashObject(item);
//             freqMap[hash] = (freqMap[hash] || 0) + 1;
//         });
//         return freqMap;
//     }

//     const freqMap = createFrequencyMap(array1);

//     for (const item of array2) {
//         const hash = hashObject(item);
//         if (!freqMap[hash]) {
//             return false;
//         }
//         freqMap[hash] -= 1;
//     }

//     return true;
// }

async function nextButton() {
    let validationResponse;

    if (step.value === 1 && form1.value) {
        validationResponse = await form1.value.validate();
    } else if (step.value === 2 && form2.value) {
        validationResponse = await form2.value.validate();
    } else if (step.value === 3 && form3.value) {
        validationResponse = await form3.value.validate();
    }

    if (validationResponse && validationResponse.valid) {
        step.value++;
    }
}

function callSnackbar(title) {
    snackbar.show = true;
    snackbar.title = title;
    snackbar.subTitle = "Cadastrado com sucesso";
    snackbar.color = "green";
    snackbar.timeout = 5000;
    snackbar.icon = "mdi-checkbox-marked-circle-outline";
}
</script>