import fse from "fs-extra"
import { resolve } from "path"
import { logErrorMsg } from "./logger"

/**
 * Reads the `index.html` file from the build directory and returns the HTML.
 */
export function getHtml() {
  const path = resolve(__dirname, "..", "..", "build", "index.html")

  try {
    return fse.readFileSync(path, "utf8")
  } catch (error) {
    logErrorMsg("Could not read index.html file from build directory.")
  }
}
