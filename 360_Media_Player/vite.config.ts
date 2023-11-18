import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import config from "./application.json"

const sslOptions = {
  cert: "./keys/server.cert",
  key: "./keys/server.key",
};

export default defineConfig({
  server: {
    https: sslOptions,
    port: parseInt(config.mediaPlayerPort, 10), // Convert the string to an integer
  },
  plugins: [react()],
});
