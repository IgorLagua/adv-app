// utils/deepMerge.js

function deepMerge(target, source) {
	for (const key in source) {
	  if (source[key] instanceof Object && key in target) {
		Object.assign(source[key], deepMerge(target[key], source[key]));
	  }
	}
	return Object.assign(target || {}, source);
  }
  
  export default deepMerge;
  