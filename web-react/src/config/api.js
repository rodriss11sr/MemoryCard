const VITE_API_URL = import.meta.env.VITE_API_URL || '';

export const API_BASE_URL = VITE_API_URL ? `${VITE_API_URL}/api` : '/api';

// Resuelve rutas de activos/avatars que pueden ser URLs absolutas o rutas relativas
export function resolveAssetUrl(path) {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  // Si tenemos VITE_API_URL definida, prefijar el host (para producción)
  if (VITE_API_URL) return `${VITE_API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  // En desarrollo sin VITE_API_URL, dejar la ruta tal cual (Vite proxy o servidor la servirá)
  return path;
}

export default API_BASE_URL;
