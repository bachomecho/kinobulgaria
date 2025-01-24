import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://localhost:8080",
				changeOrigin: true,
			},
			"/auth": {
				target: "http://localhost:8080",
				changeOrigin: true,
			},
			"/images": {
				target: "http://localhost:8080",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/images/, "assets/static/images"),
			},
			"/icons": {
				target: "http://localhost:8080",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/icons/, "assets/static/icons"),
			},
		},
	},
	build: {
		outDir: "dist/app",
		emptyOutDir: true,
	},
});
