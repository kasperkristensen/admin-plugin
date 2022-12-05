import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { createServer } from "vite";
import { defineBackend } from "../utils/define-backend";

develop();

async function develop() {
  const server = await createServer({
    root: resolve(__dirname, "../", "client"),
    server: {
      host: "localhost",
      port: 7000,
      hmr: true,
      open: true,
    },
    plugins: [react()],
    define: defineBackend(),
  });

  await server.listen();
}
