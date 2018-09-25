module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
		"node": true,
		"webextensions": true
	},
	"globals": {
		"$": true,
		"Switch": true,
		"swal": true,
		"moment": true,
		"emoji": true,
		"FileSaver": true,
		"Noty": true
	},
	"extends": ["eslint:recommended"],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"always"
		],
		"strict": "error",
		"prefer-arrow-callback": "error",
		"eqeqeq": ["error", "always"],
		"no-var": "error",
		"prefer-const": "error",
		"arrow-parens": ["error", "always"],
		"no-console": "off",
		"no-unused-vars": ["error"]
	}
};