#! /usr/bin/env node

import { Command } from "commander";
import { build } from "./commands/build";

const program = new Command();

program
  .name("medusa-admin-cli")
  .description("Medusa Admin CLI")
  .version("0.0.1");

program
  .command("build")
  .alias("b")
  .description("Builds the admin dashboard")
  .option("-o, --outDir <path>", "Output directory")
  .option("-w, --watch", "Watch for changes")
  .action(async (options) => {
    await build(options);
  });

program.parse();
