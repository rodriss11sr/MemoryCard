import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

function getDbConfigFromUrl(urlString) {
  try {
    const url = new URL(urlString);
    return {
      host: url.hostname,
      user: url.username,
      password: url.password,
      database: url.pathname ? url.pathname.replace(/^\//, '') : undefined,
      port: url.port ? parseInt(url.port, 10) : 3306
    };
  } catch (e) {
    return null;
  }
}

// Crear el pool de conexiones
// -- Pool original (comentado para mantener referencia)
/*
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'memory_card',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});
*/

// Nuevo pool: prioriza `MYSQL_URL`, luego `MYSQLHOST`/`MYSQLPORT` del .env, y finalmente `cfg` previo.
function makePoolFromEnv() {
  const defaults = {
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4',
    connectTimeout: 10000
  };

  const trimQuotes = (s) => typeof s === 'string' ? s.replace(/^\s*["']|["']\s*$/g, '') : s;

  // Priorizar MYSQL_PUBLIC_URL -> MYSQL_URL -> vars individuales
  const candidates = ['MYSQL_PUBLIC_URL', 'MYSQL_URL'];
  for (const name of candidates) {
    const raw = process.env[name];
    if (!raw) continue;
    const urlStr = trimQuotes(raw);
    const parsed = getDbConfigFromUrl(urlStr);
    if (parsed) {
      console.log(`DB: usando ${name} -> ${parsed.host}:${parsed.port}/${parsed.database}`);
      return mysql.createPool(Object.assign({}, defaults, {
        host: parsed.host,
        user: parsed.user,
        password: parsed.password,
        database: parsed.database,
        port: parsed.port
      }));
    }
  }

  // Si no hay URL, construir desde variables individuales
  const host = process.env.MYSQLHOST || process.env.RAILWAY_TCP_PROXY_DOMAIN || 'localhost';
  const user = process.env.MYSQLUSER || process.env.MYSQL_USER || 'root';
  const password = process.env.MYSQLPASSWORD || process.env.MYSQL_ROOT_PASSWORD || '';
  const database = process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || 'memory_card';
  const port = parseInt(process.env.MYSQLPORT || process.env.MYSQL_PORT || 3306, 10);

  console.log(`DB: usando variables -> ${host}:${port}/${database}`);
  return mysql.createPool(Object.assign({}, defaults, {
    host,
    user,
    password,
    database,
    port
  }));
}

const pool = makePoolFromEnv();

// Función para probar la conexión
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión a la base de datos exitosa');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    return false;
  }
}

export default pool;
