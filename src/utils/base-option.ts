/**
 * Validates that the provided base is a valid base, and not a reserved path such as '/admin', '/store', or '/'.
 * Also validates that the current built has the same base as the one provided.
 */
export function validateBase(base?: string) {
  if (!base) {
    return true;
  }

  if (base === "admin") {
    throw new Error(
      `The base path "${base}" is reserved for the admin API. Please choose another base path.`
    );
  }

  if (base === "store") {
    throw new Error(
      `The base path "${base}" is reserved for the store API. Please choose another base path.`
    );
  }

  if (base === "" || base === "/") {
    throw new Error(
      `The base path "${base}" is not allowed. Please choose another base path for the admin dashboard. An example of a valid base path is "app".`
    );
  }
}

/**
 * Formats the base path to be used in the admin dashboard.
 * Ensures that the base path starts and ends with a slash,
 * as this is required.
 */
export function formatBase(base: string) {
  if (base.startsWith("/") && base.endsWith("/")) {
    return base;
  }

  if (base.startsWith("/") && !base.endsWith("/")) {
    return `${base}/`;
  }

  if (!base.startsWith("/") && base.endsWith("/")) {
    return `/${base}`;
  }

  return `/${base}/`;
}

/**
 * Formats the base path that the admin dashboard will be served from.
 * Ensures that the base path starts with a slash, but does not end with a slash.
 */
export function formatPath(base: string) {
  if (base.startsWith("/") && !base.endsWith("/")) {
    return base;
  }

  if (!base.startsWith("/") && !base.endsWith("/")) {
    return `/${base}`;
  }

  if (base.startsWith("/") && base.endsWith("/")) {
    return base.slice(0, -1);
  }

  return `/${base}`;
}
