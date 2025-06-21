import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
 
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 4174,
    strictPort: true,
    allowedHosts: [
      'admin.foodsavr.com',
      'www.admin.foodsavr.com',
      'localhost',
      '127.0.0.1'
    ]
  },
  build: {
    sourcemap: false,
    minify: "esbuild",
  },
});