export default {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./src/*.{js,jsx,ts,tsx}",
		"./index.html",
	],
	theme: {
		extend: {
			colors: {
				ytred: "#eb2323",
				wikigrey: "#737373",
				"primary-foreground": "#fff",
				ring: "#5a67d8",
				background: "#f7fafc",
				navy: {
					500: "#001f3f",
					600: "#001a35",
				},
				nav: {
					normal: "#FFD700",
					dark: "#f5d31b",
				},
			},
		},
	},
	plugins: [],
};
