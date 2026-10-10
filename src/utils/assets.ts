/**
 * Asset URL Resolver for GitHub Pages & Subdirectory Deployments
 * Ensures all static assets (images, audio, icons) resolve correctly
 * regardless of whether hosted on root domain or subdirectory (e.g. /daxi-80th-campus-rpg/).
 */
export function getAssetUrl(path?: string): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL ?? './';
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}
