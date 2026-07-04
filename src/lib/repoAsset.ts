/** Resolve a repo-hosted static asset against the active Vite base URL */
export function repoAsset(filename: string): string {
  return `${import.meta.env.BASE_URL}${filename.replace(/^\//, '')}`
}
