<template>
    <div class="text-center">
        <v-dialog v-model="customers.openModalForm">
            <v-card>
                <v-card-title>
                    <span class="text-h5 d-flex align-center flex-column">{{
                        title
                    }}</span>
                </v-card-title>

                <v-progress-linear
                    v-if="customers.isLoading"
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
                                        v-for="data in customerDataRequired"
                                        :key="data.label"
                                        :cols="data.cols"
                                        :sm="data.sm"
                                        :md="data.md"
                                    >
                                        <AdmCommonFormDefault
                                            :data="data"
                                            v-model="
                                                customers.formData[data.key]
                                            "
                                        />
                                    </v-col>
                                </v-row>
                            </v-form>
                        </template>

                        <template v-slot:item.2>
                            <h3 class="text-h6">Cadastro do Endereço</h3>

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
                                                customers.formData.address[
                                                    data.key
                                                ]
                                            "
                                            @update="updateAddress"
                                        />
                                    </v-col>
                                    <!-- customers.formData.address[data.key] -->
                                </v-row>
                            </v-form>
                        </template>

                        <template v-slot:item.3>
                            <h3 class="text-h6">Cadastro de Telefones</h3>

                            <br />

                            <v-form ref="form3">
                                <v-col>
                                    <AdmCommonFormPhoneDynamic
                                        v-model="customers.formData.phones"
                                    />
                                </v-col>
                            </v-form>
                        </template>

                        <template v-slot:item.4>
                            <h3 class="text-h6">Cadastro de Itens Opcionais</h3>

                            <br />

                            <v-form ref="form4">
                                <v-row>
                                    <v-col
                                        v-for="data in customerDataOptional"
                                        :key="data.label"
                                        :cols="data.cols"
                                        :sm="data.sm"
                                        :md="data.md"
                                    >
                                        <AdmCommonFormDefault
                                            :data="data"
                                            v-model="
                                                customers.formData[data.key]
                                            "
                                        />
                                    </v-col>
                                </v-row>

                                <v-row
                                    v-for="(
                                        row, rowIndex
                                    ) in classEntities.formData"
                                    :key="rowIndex"
                                >
                                    <v-col
                                        v-for="data in customerClassEntitiesDataOptional"
                                        :key="data.key"
                                        :cols="data.cols"
                                        :sm="data.sm"
                                        :md="data.md"
                                    >
                                        <AdmCommonFormDefault
                                            :data="data"
                                            v-model="row[data.key]"
                                        />
                                    </v-col>

                                    <v-col cols="2">
                                        <div class="mr-1">
                                            <v-btn
                                                height="38"
                                                block
                                                v-if="rowIndex === 0"
                                                @click="addRow"
                                                >Adicionar</v-btn
                                            >
                                            <v-btn
                                                height="38"
                                                block
                                                v-else
                                                @click="removeRow(rowIndex)"
                                                >Apagar</v-btn
                                            >
                                        </div>
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
</template>

<script setup>
import { useCustomersStore } from "~/stores/adm/customers";
import { useClassEntitiesStore } from "~/stores/adm/classEntities";
import { useAddressesStore } from "~/stores/adm/addresses";
import { usePhonesStore } from "~/stores/adm/phones";
import { useZipCodeStore } from "~/stores/zipCode";
import { useSnackbarStore } from "~/stores/snackbar";

const customers = useCustomersStore();
const classEntities = useClassEntitiesStore();
const addresses = useAddressesStore();
const phones = usePhonesStore();
const zipCode = useZipCodeStore();
const snackbar = useSnackbarStore();

const { updateErrorMessages } = useApiErrorMessages();

const props = defineProps({
    title: { type: String, required: false },
});

function addRow() {
    classEntities.formData.push({
        number: "",
        type: "",
        state: "",
    });
}

function removeRow(rowIndex) {
    classEntities.formData.splice(rowIndex, 1);
}

// Dados dos inputs com Validações --> vem da pasta composables/useDataCustomer
const customerDataRequired = ref(customerFieldsRequired());
const customerDataOptional = ref(customerFieldsOptional());
const customerClassEntitiesDataOptional = ref(
    customerClassEntitiesFieldsOptional()
);

const addressDataRequired = ref(addressFieldsRequired());

async function updateAddress(value) {
    addressDataRequired.value[0].loading = true;
    await zipCode.getZipCodeAction(value);
    addressDataRequired.value[0].loading = false;

    if (zipCode.formData.erro) {
        addressDataRequired.value[0].errorMensages = "CEP não encontrado";
        customers.formData.address.address = null;
        customers.formData.address.district = null;
        customers.formData.address.city = null;
        customers.formData.address.state = null;
        customers.formData.address.number = null;
        customers.formData.address.complement = null;
    } else {
        customers.formData.address.address = zipCode.formData.logradouro;
        customers.formData.address.district = zipCode.formData.bairro;
        customers.formData.address.city = zipCode.formData.localidade;
        customers.formData.address.state = zipCode.formData.uf;
        customers.formData.address.number = null;
        customers.formData.address.complement = null;
    }
}

const step = ref(1);

// Monitora se o step tem valor 4 a chama showApiAction para preencher os dados de classEntities
watch(step, async (newStep) => {
    if (newStep === 4) {
        await classEntities.showApiAction(customers.formData.id);
    }
});

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
            clearFields(customerDataRequired.value, customers.formData);
            break;
        case 2:
            customers.formData.address = {};
            break;
        case 3:
            customers.formData.phones = [];
            break;
        case 4:
            clearFields(customerDataOptional.value, customers.formData);
            break;
    }
}

function closeForm() {
    customers.openModalForm = false;
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

function addCustomerId(arr, customerId) {
    return arr.map((obj) => ({
        ...obj,
        customer_id: customerId,
    }));
}

async function saveButton() {
    let index = null;
    if (customers.formData.id) {
        index = customers.data.findIndex(
            (el) => el.id === customers.formData.id
        );
    }

    if (step.value === 1) {
        isLoading.value = true;

        let formData = {};
        customerDataRequired.value.forEach((value) => {
            formData[value.key] = customers.formData[value.key];
        });

        if (customers.formData.id) {
            formData.id = customers.formData.id;
            await customers.updateApiAction(formData);
        } else {
            await customers.storeApiAction(formData);
        }

        // Verifica se existem erros de API retornados.
        if (Object.values(customers.apiErrors).length !== 0) {
            // Mapeia os erros da API para os campos do formulário.
            updateErrorMessages(
                customers.apiErrors,
                customerDataRequired.value
            );
        } else {
            callSnackbar(customers.formData.name);
			nextButton()
        }

        isLoading.value = false;
    }

    if (step.value === 2) {
        isLoading.value = true;

        let formData = {};

        formData = customers.formData.address;

        formData.id = customers.formData.id; //pega o ultimo cliente cadastrado e insere no formData
        formData.type = "customer";

        await addresses.storeApiAction(formData);

        // Verifica se existem erros de API retornados.
        if (Object.values(addresses.apiErrors).length !== 0) {
            // Mapeia os erros da API para os campos do formulário.
            updateErrorMessages(addresses.apiErrors, addressDataRequired.value);
        } else {
            callSnackbar("Endereço");
			nextButton()
        }

        isLoading.value = false;
    }

    if (step.value === 3) {
        isLoading.value = true;

        let formData = {};

        formData.phones = customers.formData.phones;
        formData.id = customers.formData.id; //pega o ultimo cliente cadastrado e insere no formData
        formData.type = "customer";

        // Se já foi salvo o telefone e o formulario de cadastro esta vazio, apaga o telefone do cliente
        if (
            customers.data[index].phones.length > 0 &&
            customers.formData.phones.length === 1 &&
            !customers.formData.phones[0].number
        ) {
            await phones.destroyApiAction({ ...formData });
        }
        // Cria o telefone se não tem telefone no cliente
        else if (customers.data[index].phones.length === 0) {
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
			nextButton()
        }

        isLoading.value = false;
    }

    if (step.value === 4) {
        isLoading.value = true;

        // remove os objetos que não tem valores no classEntities.formData
        const classEntitiesEmpty = removeEmptyObjects(classEntities.formData);

        // Verifica se existe a chave com o id do cliente no classEntities.data
        const keyExists = classEntities.data.some(
            (el) => el[customers.formData.id]
        );

        // se não existir a chave, faz o create
        if (classEntitiesEmpty.length > 0 && !keyExists) {
            // Antes de executar o Create, insere a chave customer_id em cada item do objeto formData
            const classEntitiesFormData = addCustomerId(
                classEntitiesEmpty,
                customers.formData.id
            );
            await classEntities.storeApiAction(
                classEntitiesFormData,
                customers.formData.id
            );
        }

        // Se existir a chave
        if (keyExists) {
            // Procura o index da chave no classEntities.data
            const classEntity = classEntities.data.find((el) =>
                el.hasOwnProperty(customers.formData.id)
            );

            // Se encontrar a entidade de classe, compara se os dados são iguais ao formData
            if (classEntity) {
                const comparisonIsEqual = compareArrays(
                    classEntity[customers.formData.id],
                    classEntities.formData
                );

                // Se for diferente, executa o update
                if (!comparisonIsEqual) {
                    await classEntities.updateApiAction(
                        classEntitiesEmpty,
                        customers.formData.id
                    );
                }
            }
        }



        await customers.updateApiAction(customers.formData);

        // Verifica se existem erros de API retornados.
        if (Object.values(customers.apiErrors).length !== 0) {
            // Mapeia os erros da API para os campos do formulário.
            // mapApiErrorsToFormData(customerDataOptional.value, customers.apiErrors);
            updateErrorMessages(
                customers.apiErrors,
                customerDataOptional.value
            );
        } else {
            callSnackbar("Dados opcionais");
        }

        isLoading.value = false;
    }
}

const nextDisabled = computed(() => {
    if (step.value === 1 && form1.value && customers.formData.id) {
        return !form1.value.isValid;
    } else if (
        step.value === 2 &&
        form2.value &&
        customers.formData.address?.zipCode
    ) {
        return !form2.value.isValid;
    } else if (step.value === 3 && form3.value) {
        return !form3.value.isValid;
    }
    return true; // Desabilita o botão por padrão se nenhuma condição acima for atendida
});

const saveDisabled = computed(() => {
    let index = null;
    if (customers.formData.id) {
        index = customers.data.findIndex(
            (el) => el.id === customers.formData.id
        );
    }

    if (step.value === 1 && form1.value?.isValid) {
        // Verifica se o campo 'id' não existe em customers.formData
        if (!("id" in customers.formData)) {
            return false; // Retorna falso para habilitar o botão
        }

        if (index >= 0) {
            for (let i = 0; i < customerDataRequired.value.length; i++) {
                const data = customerDataRequired.value[i];
                // console.log("customers.formData[data.key]", customers.formData[data.key]);
                // console.log("customers.data[index][data.key]", customers.data[index][data.key]);
                if (
                    customers.formData[data.key] !==
                    customers.data[index][data.key]
                ) {
                    return false; // Retorna falso para habilitar o botão
                }
            }
        }
    }

    if (step.value === 2 && form2.value?.isValid) {
        // Se customers.formData.address for nulo, habilita o botão
        if (!customers.formData.address) {
            return false; // Retorna falso para habilitar o botão
        } else {
            //Se qualquer campo for diferente, habilita o botão
            for (let i = 0; i < addressDataRequired.value.length; i++) {
                const data = addressDataRequired.value[i];

                let addressFormData = customers.formData.address[data.key];
                let addressData = customers.data[index].address[data.key];

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
        // Verifica se todos os números em customers.formData.phones não são nulos e vazios
        const nunbersPhonesFormValid = customers.formData.phones.every(
            (phone) => phone.number && phone.number.trim() !== ""
        );

        // Verifica se os arrays são diferentes para habilitar o botão
        const comparisonIsEqual = compareArrays(
            customers.data[index].phones,
            customers.formData.phones
        );

        if (!comparisonIsEqual && nunbersPhonesFormValid) {
            return false; // Retorna falso para habilitar o botão
        }

        if (comparisonIsEqual && !nunbersPhonesFormValid) {
            return false; // Retorna falso para habilitar o botão
        }

        // Se tinha telefone e foi acionado o botão limpar do formulario, pode salvar o telefone vazio
        if (
            customers.data[index].phones.length > 0 &&
            customers.formData.phones.length === 1 &&
            !customers.formData.phones[0].number
        ) {
            return false; // Retorna falso para habilitar o botão
        }
    }

    if (step.value === 4 && form4.value?.isValid) {
        for (let i = 0; i < customerDataOptional.value.length; i++) {
            const data = customerDataOptional.value[i];

            // Verifica se existe valor em customers.data[index][data.key]
            // e não existe valor em customers.formData[data.key]
            if (
                customers.data[index][data.key] &&
                !customers.formData[data.key]
            ) {
                return false;
            }

            // Se qualquer campo tiver valor e esse valor for diferente de vazio
            // e diferente do gravado em customers.data[index], habilitar o botão
            if (
                customers.formData[data.key] &&
                customers.formData[data.key] !== "" &&
                customers.formData[data.key] !== customers.data[index][data.key]
            ) {
                return false; // Retorna falso para habilitar o botão
            }
        }

        // Procura a entidade de classe com a chave no classEntities.data
        const classEntity = classEntities.data.find((el) =>
            el.hasOwnProperty(customers.formData.id)
        );

        if (classEntity) {
            // Compara se classEntities.data é igual a classEntities.formData
            return compareArrays(
                classEntity[customers.formData.id],
                classEntities.formData
            );
        }
    }

    // Desabilita o botão por padrão se nenhuma condição acima for atendida
    return true;
});


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
        // console.log('nextButton1')
        step.value++;
    }
}

// function prevButton() {
//     if (step.value > 1) step.value--;
// }

function callSnackbar(title) {
    snackbar.show = true;
    snackbar.title = title;
    snackbar.subTitle = "Cadastrado com sucesso";
    snackbar.color = "green";
    snackbar.timeout = 5000;
    snackbar.icon = "mdi-checkbox-marked-circle-outline";
}
</script>



const saveDisabled = computed(() => {
    let index = null;
    if (customers.formData.id) {
        index = customers.data.findIndex(
            (el) => el.id === customers.formData.id
        );

		if ( step.value === 4 )
		console.log('step.value', step.value);
		
		await classEntities.showApiAction(customers.formData.id);
    }

    if (step.value === 4 && form4.value?.isValid) {
        for (let i = 0; i < customerDataOptional.value.length; i++) {
            const data = customerDataOptional.value[i];

            // Verifica se existe valor em customers.data[index][data.key]
            // e não existe valor em customers.formData[data.key]
            if (
                customers.data[index][data.key] &&
                !customers.formData[data.key]
            ) {
                return false;
            }

            // Se qualquer campo tiver valor e esse valor for diferente de vazio
            // e diferente do gravado em customers.data[index], habilitar o botão
            if (
                customers.formData[data.key] &&
                customers.formData[data.key] !== "" &&
                customers.formData[data.key] !== customers.data[index][data.key]
            ) {
                return false; // Retorna falso para habilitar o botão
            }
        }




    }
    // Desabilita o botão por padrão se nenhuma condição acima for atendida
    return true;
});