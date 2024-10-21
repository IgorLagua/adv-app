import { useAuthenticationStore } from "~/stores/site/authentication";
import { useCommonStore } from "~/stores/common";

export function errorsApi(errors) {
	const authentication = useAuthenticationStore();
	const common = useCommonStore();

	if (errors.message === 'Unauthenticated.') {
		// Código existente para erro de autenticação
		common.headline = "Whoops, erro";
		common.title = "Usuário não Autenticado";
		common.text = "A autenticação expirou ou outro usuário está autenticado com seus dados em uma sessão diferente.";
		common.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Alert-Stop-Warning-Error_icon.svg/240px-Alert-Stop-Warning-Error_icon.svg.png";
		common.actionText = "Autenticar";
		authentication.isAuthenticated = false;
		common.showDialogErrorApi = true;
	} else if (errors.message === 'Usuário sem permissão de acesso. (e mais 2 erros)') {
		// Código existente para erro de permissão
		common.headline = "Whoops, erro";
		common.title = errors.errors?.error?.[0] || "Erro de Permissão";
		common.text = `O administrador do sistema precisa liberar o recurso: (${errors.errors?.resourceDescription?.[0] || 'N/A'}) com a permissão: (${errors.errors?.permissionDescription?.[0] || 'N/A'})`;
		common.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Icon_no_permission.svg/240px-Icon_no_permission.svg.png";
		common.actionText = "Voltar";
		common.showDialogErrorApi = true;
	} else if (errors.message.includes('Failed to fetch') || errors.message.includes('NetworkError') || errors.message.includes('ERR_CERT_DATE_INVALID') || errors.message.includes('ERR_CONNECTION_REFUSED')) {
		// Tratamento para erros de rede
		
		common.headline = "Erro de Conexão";
		common.title = "Não foi possível conectar ao servidor";
		common.text = "Verifique sua conexão com a internet ou tente novamente mais tarde.";
		common.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Icon_Connection_Error.svg/240px-Icon_Connection_Error.svg.png";
		common.actionText = "Tentar Novamente";
		common.showDialogErrorApi = true;
	} else {
		// Tratamento padrão para outros erros
		common.headline = "Erro Desconhecido";
		common.title = errors.message || "Ocorreu um erro inesperado";
		common.text = "Por favor, tente novamente mais tarde.";
		common.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Alert-Stop-Warning-Error_icon.svg/240px-Alert-Stop-Warning-Error_icon.svg.png";
		common.actionText = "Voltar";
		common.showDialogErrorApi = true;
	}
}
