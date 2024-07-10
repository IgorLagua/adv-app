

/**
 * Converte uma data do formato YYYY-MM-DD para DD/MM/YYYY
 * @param {string} dateString - A data no formato YYYY-MM-DD
 * @returns {string} - A data no formato DD/MM/YYYY
 */
export function dateFormat(dateString) {
	// console.log('dateString', dateString);
	if (!dateString) return '';
	const [year, month, day] = dateString.split('-');
	return `${day}/${month}/${year}`;
}
