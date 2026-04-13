const VITE_API_URL = import.meta.env.VITE_API_URL || '';
const NORMALIZED_API_URL = VITE_API_URL.replace(/\/+$/, '');

export const API_BASE_URL = NORMALIZED_API_URL ? `${NORMALIZED_API_URL}/api` : '/api';

// Resuelve rutas de activos/avatars que pueden ser URLs absolutas o rutas relativas
export function resolveAssetUrl(path) {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  // Si tenemos VITE_API_URL definida, prefijar el host (para producción)
  if (NORMALIZED_API_URL) return `${NORMALIZED_API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  // En desarrollo sin VITE_API_URL, dejar la ruta tal cual (Vite proxy o servidor la servirá)
  return path;
}

// Intentar devolver una versión de mayor resolución de una imagen
export function preferHighResImage(url) {
  if (!url || typeof url !== 'string') return url;
  try {
    let u = url;
    // Quitar parámetros de tamaño comunes en querystring
    u = u.replace(/([?&](size|w|h)=)(small|thumb|\d{1,4})/gi, '$1original');
    // Reemplazar segmentos comunes de thumbs/small
    u = u.replace(/\/thumbs\//i, '/');
    u = u.replace(/\/thumbnails\//i, '/');
    u = u.replace(/\/small\//i, '/');
    // Eliminar sufijos -thumb, _thumb, -small, _small
    u = u.replace(/[-_](thumb|small)\b/gi, '');
    // Eliminar patrones -200x300 antes de la extensión
    u = u.replace(/[-_]\d{2,4}x\d{2,4}(?=\.)/g, '');
    return u;
  } catch (e) {
    return url;
  }
}

export default API_BASE_URL;
