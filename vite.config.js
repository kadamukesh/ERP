import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Specify the output directory for the build files
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": "/src", // Optional: Alias for cleaner imports
    },
  },
  server: {
    // Optional: Automatically open the app in the default browser
    open: true,
  },
  base: "./", // Ensure relative paths are used for assets
});
