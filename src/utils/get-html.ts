import fse from "fs-extra";
import { resolve } from "path";

export function getHtml() {
  const path = resolve(__dirname, "..", "..", "build", "index.html");

  return fse.readFileSync(path, "utf8");
}
