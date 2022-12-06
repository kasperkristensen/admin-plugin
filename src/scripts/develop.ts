import react from "@vitejs/plugin-react";
import { Command } from "commander";
import dns from "dns";
import { resolve } from "path";
import { createServer } from "vite";
import { defineBackend } from "../utils/build-helpers";
import { outputDevelopmentServer } from "../utils/logger";

type DevConfig = {
  port?: number;
  url?: string;
};

dns.setDefaultResultOrder("verbatim");

/**
 * Internal script used to start a development server for the admin dashboard.
 * This is used to develop the dashboard, and is not intended to be used by
 * the end user.
 *
 * The configuration of the development server can be changed by passing in:
 * - api (-a, --api): The URL of the backend API. Defaults to "http://localhost:9000"
 * - port (-p, --port): The port on which the server should run. Defaults to 7000
 *
 * To start the server, run `yarn dev` from your terminal.
 */
async function develop({
  port = 7000,
  url = "http://localhost:9000",
}: DevConfig) {
  const server = await createServer({
    root: resolve(__dirname, "../", "client"),
    server: {
      host: "localhost",
      port: port,
      hmr: true,
      open: true,
    },
    plugins: [react()],
    define: defineBackend({ serve: false, backendUrl: url }),
  });

  await server.listen();

  outputDevelopmentServer({ port, url });
}

const program = new Command();

program
  .option("-p, --port <port>", "Port on localhost")
  .option("-u, --url <url>")
  .action(develop);

program.parse();
