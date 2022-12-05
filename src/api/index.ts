import express, { Request, Response, Router } from "express";
import fse from "fs-extra";
import { ServerResponse } from "http";
import { join, resolve } from "path";
import { PluginOptions } from "../types";

export default function (rootDirectory: string, pluginOptions: PluginOptions) {
  const app = Router();

  const serve = pluginOptions.serve || true;
  const serveInDev =
    pluginOptions.serveInDev && process.env.NODE_ENV === "development";
  const path = `/${pluginOptions.base}` || "/app";

  if (serve || serveInDev) {
    const appPath = resolve(__dirname, "..", "build", "index.html");

    const html = fse.readFileSync(appPath, "utf8");

    const sendHtml = (_req: Request, res: Response) => {
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Vary", "Origin, Cache-Control");
      res.send(html);
    };

    const setStaticHeaders = (res: ServerResponse) => {
      res.setHeader("Cache-Control", "max-age=31536000, immutable");
      res.setHeader("Vary", "Origin, Cache-Control");
    };

    app.get(path, sendHtml);
    app.use(
      path,
      express.static(join(appPath, ".."), {
        setHeaders: setStaticHeaders,
      })
    );
    app.use(`${path}/*`, sendHtml);
  }

  return app;
}
