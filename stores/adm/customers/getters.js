const getters = {

	details: (state) => {
		// console.log('state', state);
		return {
			"Informações Pessoais": [
				{ label: "Nome", value: state.formData.name },
				{ label: "CPF", value: state.formData.cpf },
				{ label: "Nome Social", value: state.formData.socialName },
				{ label: "Email", value: state.formData.email },
				{ label: "Gênero", value: state.formData.gender },
				{ label: "Pessoa Política", value: state.formData.politicalPerson ? "Sim" : "Não" },
				{ label: "Estado Civil", value: state.formData.maritalStatus },
				{ label: "Profissão", value: state.formData.profession },
				{ label: "Nacionalidade", value: state.formData.nationality },
				{ label: "Naturalidade", value: state.formData.naturalness },
				{ label: "Estado de Naturalidade", value: state.formData.naturalnessState },
				{ label: "Data de Nascimento", value: dateFormat(state.formData.birthDate) },
				{ label: "Nível de Educação", value: state.formData.educationLevels },
				{ label: "Nome do Pai", value: state.formData.fatherName },
				{ label: "Nome da Mãe", value: state.formData.motherName },
				{ label: "RG", value: state.formData.rg },
				{ label: "Data de Emissão do RG", value: dateFormat(state.formData.rgDate) },
				{ label: "CNH", value: state.formData.cnh },
				{ label: "Data de Emissão da CNH", value: dateFormat(state.formData.cnhDate) },
				{ label: "PIS", value: state.formData.pis },
				{ label: "Número do Passaporte", value: state.formData.passportNumber },
				{ label: "Número do RNE", value: state.formData.rneNumber },
				{ label: "Observação", value: state.formData.observation },
			],
			"Entidades de Classe": state.formData.classEntities?.map(
				(entity) => ({
					label: entity.type,
					value: `Número: ${entity.number} - Estado: ${entity.state}`,
				})
			),
			"Endereço": [
				{ label: "Logradouro", value: state.formData.address?.address },
				{ label: "Número", value: state.formData.address?.number },
				{ label: "Complemento", value: state.formData.address?.complement },
				{ label: "Bairro", value: state.formData.address?.district },
				{ label: "Cidade", value: state.formData.address?.city },
				{ label: "Estado", value: state.formData.address?.state },
				{ label: "CEP", value: state.formData.address?.zipCode },
			],
			"Telefones": state.formData.phones?.map((phone) => ({
				label: "Telefone",
				value: `${phone.number} (${phone.types
					.map((type) => type.type)
					.join(", ")})`,
			})),
		};

	}
};

export default { ...getters };
