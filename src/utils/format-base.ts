export function formatBase(base: string) {
  if (base.startsWith("/") && base.endsWith("/")) {
    return base;
  }

  return `/${base}/`;
}
