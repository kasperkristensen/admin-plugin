import express, { Request, Response, Router } from "express";
import fse from "fs-extra";
import { ServerResponse } from "http";
import { join, resolve } from "path";
import { PluginOptions } from "../../types";

type StaticOptions = {
  app: Router;
  rootDirectory: string;
  pluginOptions: PluginOptions;
};

export default function ({ app, rootDirectory, pluginOptions }: StaticOptions) {
  const router = Router();

  if (
    pluginOptions.serve ||
    (pluginOptions.serveInDev && process.env.NODE_ENV === "development")
  ) {
    app.use(pluginOptions.base || "/app", router);
    const path = resolve(__dirname, "..", "..", "build", "index.html");

    const html = fse.readFileSync(path, "utf8");

    const sendHtml = (_req: Request, res: Response) => {
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Vary", "Origin, Cache-Control");
      res.send(html);
    };

    const setStaticHeaders = (res: ServerResponse) => {
      res.setHeader("Cache-Control", "max-age=31536000, immutable");
      res.setHeader("Vary", "Origin, Cache-Control");
    };

    app.get("/", sendHtml);
    app.use(
      "/",
      express.static(join(path, ".."), {
        setHeaders: setStaticHeaders,
      })
    );
    app.use("/*", sendHtml);
  }

  return router;
}
