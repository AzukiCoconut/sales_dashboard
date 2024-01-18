import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/graphql": {
        target: `${process.env.REACT_APP_BASE_URL}:5001`,
        secure: false,
        changeOrigin: true
      }
    }
  }
});
