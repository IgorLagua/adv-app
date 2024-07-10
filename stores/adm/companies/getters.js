const getters = {
	details: (state) => {
		const transformCustomer = (customer) => ({
			[`Representante Legal - ${customer.name}`]: [
				{ label: "Nome", value: customer.name },
				{ label: "CPF", value: customer.cpf },
				{ label: "Nome Social", value: customer.socialName },
				{ label: "Email", value: customer.email },
				{ label: "Gênero", value: customer.gender },
				{ label: "Pessoa Política", value: customer.politicalPerson ? "Sim" : "Não" },
				{ label: "Estado Civil", value: customer.maritalStatus },
				{ label: "Profissão", value: customer.profession },
				{ label: "Nacionalidade", value: customer.nationality },
				{ label: "Naturalidade", value: customer.naturalness },
				{ label: "Estado de Naturalidade", value: customer.naturalnessState },
				{ label: "Data de Nascimento", value: dateFormat(customer.birthDate) },
				{ label: "Nível de Educação", value: customer.educationLevels },
				{ label: "Nome do Pai", value: customer.fatherName },
				{ label: "Nome da Mãe", value: customer.motherName },
				{ label: "RG", value: customer.rg },
				{ label: "Data de Emissão do RG", value: dateFormat(customer.rgDate) },
				{ label: "CNH", value: customer.cnh },
				{ label: "Data de Emissão da CNH", value: dateFormat(customer.cnhDate) },
				{ label: "PIS", value: customer.pis },
				{ label: "Número do Passaporte", value: customer.passportNumber },
				{ label: "Número do RNE", value: customer.rneNumber },
				{ label: "Observação", value: customer.observation },
				{ label: "Endereço Logradouro", value: customer.address?.address },
				{ label: "Endereço Número", value: customer.address?.number },
				{ label: "Endereço Complemento", value: customer.address?.complement },
				{ label: "Endereço Bairro", value: customer.address?.district },
				{ label: "Endereço Cidade", value: customer.address?.city },
				{ label: "Endereço Estado", value: customer.address?.state },
				{ label: "Endereço CEP", value: customer.address?.zipCode },
				...customer.phones?.map((phone, index) => ({
					label: `Telefone ${index + 1}`,
					value: `${phone.number} (${phone.types.map((type) => type.type).join(", ")})`,
				})) ?? [],
				...customer.classEntities?.map((entity, index) => ({
					label: `Entidade de Classe ${index + 1}`,
					value: `Número: ${entity.number} - Estado: ${entity.state}`,
				})) ?? []
			]
		});

		return {
			"Informações da Empresa": [
				{ label: "Razão Social", value: state.formData.corporateName },
				{ label: "CNPJ", value: state.formData.cnpj },
				{ label: "Nome Fantasia", value: state.formData.fantasyName },
				{ label: "Email", value: state.formData.email },
				{ label: "Tipo", value: state.formData.type },
				{ label: "NIRE", value: state.formData.nire },
				{ label: "Inscrição Municipal", value: state.formData.municipalRegistration },
				{ label: "Inscrição Estadual", value: state.formData.stateRegistration },
			],
			"Endereço da Empresa": [
				{ label: "Logradouro", value: state.formData.address?.address },
				{ label: "Número", value: state.formData.address?.number },
				{ label: "Complemento", value: state.formData.address?.complement },
				{ label: "Bairro", value: state.formData.address?.district },
				{ label: "Cidade", value: state.formData.address?.city },
				{ label: "Estado", value: state.formData.address?.state },
				{ label: "CEP", value: state.formData.address?.zipCode },
			],
			"Telefones da Empresa": state.formData.phones?.map((phone) => ({
				label: "Telefone",
				value: `${phone.number} (${phone.types.map((type) => type.type).join(", ")})`,
			})) ?? [],
			...state.formData.customers?.reduce((acc, customer) => {
				return { ...acc, ...transformCustomer(customer) };
			}, {}) ?? {},
		};
	}
};

export default { ...getters };

