import { useAuthenticationStore } from "~/stores/site/authentication";
import { useCommonStore } from "~/stores/common";

export function errorsApi(errors) {
	const authentication = useAuthenticationStore();
	const common = useCommonStore();

	if (errors.message === 'Unauthenticated.') {
		common.headline="Whoops, erro"
        common.title="Usuário não Autenticado"
        common.text="A autenticação expirou ou outro usuário está autenticado com seus dados em uma sessão diferente."
        common.image="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Alert-Stop-Warning-Error_icon.svg/240px-Alert-Stop-Warning-Error_icon.svg.png"
		common.actionText="Autenticar"
		authentication.isAuthenticated = false
		common.showDialogErrorApi = true
	}

	if (errors.message === 'Usuário sem permissão de acesso. (e mais 2 erros)') {
		common.headline="Whoops, erro"
        common.title=errors.errors.error[0]
        common.text=`O administrador do sistema precisa liberar o recurso: (${errors.errors.resourceDescription[0]}) com a permissão: (${errors.errors.permissionDescription[0]})`
        common.image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Icon_no_permission.svg/240px-Icon_no_permission.svg.png"
		common.actionText="Voltar"
		common.showDialogErrorApi = true
	}
}

