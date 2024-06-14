import { useAuthenticationStore } from "~/stores/site/authentication";

export function isSuperAdmin() {
	const authentication = useAuthenticationStore();
	return authentication.user?.isSuperAdmin;
}

export function isAdmin() {
	const authentication = useAuthenticationStore();
	return authentication.user?.isAdmin;
}

export function hasPermission(resource, permission) {
	const authentication = useAuthenticationStore();
	if (isSuperAdmin() || isAdmin()) {
		return true;
	}
	return authentication.user?.permissions[resource]?.[permission] ?? false;
}

