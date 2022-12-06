import { DefineBackendConfig } from "../types"
import { logErrorMsg, logWarningMsg } from "./logger"

/**
 * Formats the base path to be used in the admin dashboard.
 * Ensures that the base path starts and ends with a slash,
 * as this is required.
 */
export function formatBase(base?: string) {
  if (!base) {
    return "/app/"
  }

  if (base.startsWith("/") && base.endsWith("/")) {
    return base
  }

  if (base.startsWith("/") && !base.endsWith("/")) {
    return `${base}/`
  }

  if (!base.startsWith("/") && base.endsWith("/")) {
    return `/${base}`
  }

  return `/${base}/`
}

/**
 * Formats the base path that the admin dashboard will be served from.
 * Ensures that the base path starts with a slash, but does not end with a slash.
 * If no base path is provided, the default base path '/app' is returned.
 */
export function formatPath(base?: string) {
  if (!base) {
    return "/app"
  }

  if (base.startsWith("/") && !base.endsWith("/")) {
    return base
  }

  if (!base.startsWith("/") && !base.endsWith("/")) {
    return `/${base}`
  }

  if (base.startsWith("/") && base.endsWith("/")) {
    return base.slice(0, -1)
  }

  return `/${base}`
}

/**
 * Validates that the provided base is a valid base, and not a reserved path such as '/admin', '/store', or '/'.
 * If the base path is invalid, an error message is logged, and the build process is exited.
 */
export function validateBase(base?: string): void {
  if (!base) {
    return
  }

  let errorMsg: string | undefined = undefined

  if (base === "admin") {
    errorMsg = `The path "/${base}" is reserved for the admin API.`
  }

  if (base === "store") {
    errorMsg = `The path "/${base}" is reserved for the store API.`
  }

  if (base === "" || base === "/") {
    errorMsg = `The path "/" is reserved for the store API.`
  }

  if (errorMsg) {
    logErrorMsg(errorMsg + " Update 'base' in 'medusa-config.js' to continue.")

    process.exit(1)
  }
}

/**
 * Validates that the uses provided a valid server URL, when building for hosting the dashboard separately from the Medusa backend.
 */
export function validateURL(url?: string) {
  let errorMsg: string | undefined = undefined
  let warningMsg: string | undefined = undefined

  if (!url) {
    errorMsg = "No 'backend_url' was provided."
  } else {
    try {
      const temp = new URL(url)

      if (temp.protocol !== "https:") {
        warningMsg = `The provided 'backend_url' does not use HTTPS.`
      }
    } catch (err) {
      errorMsg = `The provided 'backend_url' "${url}" is not a valid URL.`
    }
  }

  if (errorMsg) {
    logErrorMsg(errorMsg)

    process.exit(1)
  }

  if (warningMsg) {
    logWarningMsg(warningMsg)
  }
}

/**
 * Utility function to define the backend for the plugin.
 * This is used to inject the URL of the server into the build of the admin dashboard.
 * If the dashboard is served as part of the same server as the API, the URL is set to "/",
 * otherwise it needs to be set to the URL of the API.
 */
export const defineBackend = ({
  serve = true,
  backendUrl = "http://localhost:9000",
}: DefineBackendConfig) => {
  return {
    ___MEDUSA_BACKEND_URL___: JSON.stringify(serve ? "/" : backendUrl),
  }
}
