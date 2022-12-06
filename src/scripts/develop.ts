#! /usr/bin/env node

import react from "@vitejs/plugin-react";
import { Command } from "commander";
import dns from "dns";
import { resolve } from "path";
import { createServer } from "vite";
import { defineBackend } from "../utils/define-backend";

dns.setDefaultResultOrder("verbatim");

const program = new Command();

program
  .option("-p, --port <port>", "Port on localhost")
  .option("-a, --api <api>")
  .action(develop);

program.parse();

type DevConfig = {
  port?: number;
  api?: string;
};

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
async function develop({
  port = 7000,
  api = "http://localhost:9000",
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
    define: defineBackend({ serve: false, backendUrl: api }),
  });

  await server.listen();
}
