const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function sitePath(path: string) {
  if (!basePath) return path;
  if (path === "/") return `${basePath}/`;
  if (path.startsWith("#")) return `${basePath}/${path}`;
  if (path.startsWith("/")) return `${basePath}${path}`;
  return path;
}
