import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0", // To access from the same network
        port: 5173, // Vite default port
        proxy: {
            "/api": {
                target: "https://grafana.bsfa-group.com/", //http://localhost:3000", // Backend URL
                changeOrigin: true,
                secure: false, // If using https
                rewrite: (path) => path.replace(/^\/api/, ""), // Remove /api prefix from the request
            },
        },
    },
});