module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
		"webextensions": true
	},
	"globals": {
		"$": true,
		"Switch": true,
		"swal": true
	},
	"extends": "eslint:recommended",
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
		"prefer-arrow-callback": "error",
		"eqeqeq": ["error", "always"],
		"no-var": "error",
		"prefer-const": "error",
		"arrow-parens": ["error", "always"],
		"no-console": "off"
	}
};