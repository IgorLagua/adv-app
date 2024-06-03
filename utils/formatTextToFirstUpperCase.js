export default (text) => {
	return text.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}