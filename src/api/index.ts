import express, { Request, Response, Router } from "express";
import fse from "fs-extra";
import { ServerResponse } from "http";
import path from "path";
import { PluginOptions } from "../types";

export default function (rootDirectory: string, pluginOptions: PluginOptions) {
  const app = Router();

  const appPath = path.resolve(__dirname, "..", "build", "index.html");

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

  app.get("/app", sendHtml);
  app.use(
    "/app",
    express.static(path.join(appPath, ".."), {
      setHeaders: setStaticHeaders,
    })
  );
  app.use("/app/*", sendHtml);

  return app;
}
