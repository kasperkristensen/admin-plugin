import fse from "fs-extra";
import { resolve } from "path";

/**
 * Reads the `index.html` file from the build directory and returns it.
 */
export function getHtml() {
  const path = resolve(__dirname, "..", "..", "build", "index.html");

  return fse.readFileSync(path, "utf8");
}
