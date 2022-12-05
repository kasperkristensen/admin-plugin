import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { env } from "process";
import { createServer } from "vite";
import { defineBackend } from "../utils/define-backend";

const BACKEND_URL = env.BACKEND_URL || undefined;
const DEV_PORT = env.DEV_PORT ? parseInt(env.DEV_PORT) : 7000;

develop();

/**
 * Internal script used to start a development server for the admin dashboard.
 * This is used to develop the dashboard, and is not intended to be used by
 * the end user.
 *
 * The configuration of the server can be changed by setting the environment variables:
 * - BACKEND_URL: The URL of the backend API. Defaults to "http://localhost:9000"
 * - DEV_PORT: The port on which the server should run. Defaults to 7000
 *
 * To start the server, run `yarn dev` from your terminal.
 */
async function develop() {
  const server = await createServer({
    root: resolve(__dirname, "../", "client"),
    server: {
      host: "localhost",
      port: DEV_PORT,
      hmr: true,
      open: true,
    },
    plugins: [react()],
    define: defineBackend({ serve: false, backendUrl: BACKEND_URL }),
  });

  await server.listen();
}
