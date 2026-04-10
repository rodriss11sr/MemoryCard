import dotenv from 'dotenv';
import db from './config/database.js';

// Cargar el .env desde la misma carpeta (backend)
dotenv.config({ path: './.env' });

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

async function obtenerToken() {
  // Si el token ya está en el .env, nos ahorramos la petición a Twitch
  if (process.env.TWITCH_ACCESS_TOKEN) {
    console.log('🔑 Usando token de Twitch guardado en el .env...');
    return process.env.TWITCH_ACCESS_TOKEN;
  }

  console.log('🔑 Obteniendo token de acceso de Twitch...');
  const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`, {
    method: 'POST'
  });
  const data = await response.json();
  if (!data.access_token) throw new Error('No se pudo obtener el token. Revisa tus credenciales.');
  return data.access_token;
}

// =========================================================
// FASE 1: DESARROLLADORAS (COMPANIES)
// =========================================================

async function obtenerDesarrolladoras(token, maxTotal = Infinity) {
  console.log(`🏢 Descargando desarrolladoras desde IGDB (Sin límite)...`);
  
  let todas = [];
  let offset = 0;
  const limit = 500;

  while (todas.length < maxTotal) {
    const query = `
      fields name;
      where developed != null;
      limit ${limit};
      offset ${offset};
    `;

    const response = await fetch('https://api.igdb.com/v4/companies', {
      method: 'POST',
      headers: {
        'Client-ID': CLIENT_ID,
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: query
    });

    if (!response.ok) throw new Error('Error IGDB (Companies): ' + await response.text());
    
    const data = await response.json();
    if (data.length === 0) break; // Ya no hay más resultados disponibles
    
    todas = todas.concat(data);
    console.log(`   ... ${todas.length} desarrolladoras obtenidas`);
    offset += limit;
    
    // Pausa de 250ms para no exceder el límite de 4 peticiones/segundo de Twitch
    await new Promise(r => setTimeout(r, 250));
  }

  return todas;
}

async function volcarDesarrolladoras(empresas) {
  console.log('💾 Volcando desarrolladoras en la base de datos...\n');
  let insertadas = 0;

  for (const empresa of empresas) {
    try {
      if (empresa.name) {
        // Usamos INSERT IGNORE en MySQL para evitar duplicados
        await db.query('INSERT IGNORE INTO desarrolladora (nombre) VALUES (?)', [empresa.name]);
        insertadas++;
      }
    } catch (error) {
      console.error(`❌ Error al insertar empresa "${empresa.name}":`, error.message);
    }
  }
  
  console.log(`✅ Se han procesado ${insertadas} desarrolladoras.\n`);
}

// =========================================================
// FASE 2: PLATAFORMAS (PLATFORMS)
// =========================================================

async function obtenerPlataformas(token, maxTotal = Infinity) {
  console.log(`🎮 Descargando plataformas desde IGDB (Sin límite)...`);
  
  let todas = [];
  let offset = 0;
  const limit = 500;

  while (todas.length < maxTotal) {
    const query = `
      fields name;
      limit ${limit};
      offset ${offset};
    `;

    const response = await fetch('https://api.igdb.com/v4/platforms', {
      method: 'POST',
      headers: {
        'Client-ID': CLIENT_ID,
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: query
    });

    if (!response.ok) throw new Error('Error IGDB (Platforms): ' + await response.text());
    
    const data = await response.json();
    if (data.length === 0) break;
    
    todas = todas.concat(data);
    console.log(`   ... ${todas.length} plataformas obtenidas`);
    offset += limit;
    await new Promise(r => setTimeout(r, 250));
  }

  return todas;
}

async function volcarPlataformas(plataformas) {
  console.log('💾 Volcando plataformas en la base de datos...\n');
  let insertadas = 0;

  for (const plataforma of plataformas) {
    try {
      if (plataforma.name) {
        await db.query('INSERT IGNORE INTO plataforma (nombre) VALUES (?)', [plataforma.name]);
        insertadas++;
      }
    } catch (error) {
      console.error(`❌ Error al insertar plataforma "${plataforma.name}":`, error.message);
    }
  }
  
  console.log(`✅ Se han procesado ${insertadas} plataformas.\n`);
}

// =========================================================
// FASE 3: GÉNEROS (GENRES)
// =========================================================

async function obtenerGeneros(token, maxTotal = Infinity) {
  console.log(`🎨 Descargando géneros desde IGDB (Sin límite)...`);
  
  let todos = [];
  let offset = 0;
  const limit = 500;

  while (todos.length < maxTotal) {
    const query = `
      fields name;
      limit ${limit};
      offset ${offset};
    `;

    const response = await fetch('https://api.igdb.com/v4/genres', {
      method: 'POST',
      headers: {
        'Client-ID': CLIENT_ID,
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: query
    });

    if (!response.ok) throw new Error('Error IGDB (Genres): ' + await response.text());
    
    const data = await response.json();
    if (data.length === 0) break;
    
    todos = todos.concat(data);
    console.log(`   ... ${todos.length} géneros obtenidos`);
    offset += limit;
    await new Promise(r => setTimeout(r, 250));
  }

  return todos;
}

async function volcarGeneros(generos) {
  console.log('💾 Volcando géneros en la base de datos...\n');
  let insertados = 0;

  for (const genero of generos) {
    try {
      if (genero.name) {
        await db.query('INSERT IGNORE INTO genero (nombre) VALUES (?)', [genero.name]);
        insertados++;
      }
    } catch (error) {
      console.error(`❌ Error al insertar género "${genero.name}":`, error.message);
    }
  }
  
  console.log(`✅ Se han procesado ${insertados} géneros.\n`);
}

// =========================================================
// FASE 4: JUEGOS (GAMES) Y SUS RELACIONES
// =========================================================

async function obtenerJuegos(token, maxTotal = Infinity) {
  console.log(`\n🎮 Descargando juegos desde IGDB (Sin límite)...`);
  
  let todos = [];
  let offset = 0;
  const limit = 500;

  while (todos.length < maxTotal) {
    const query = `
      fields name, summary, first_release_date, cover.url, 
             platforms.name, genres.name, 
             involved_companies.developer, involved_companies.company.name;
      where cover != null & first_release_date != null & platforms != null & genres != null;
      sort rating desc;
      limit ${limit};
      offset ${offset};
    `;

    const response = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': CLIENT_ID,
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: query
    });

    if (!response.ok) throw new Error('Error IGDB (Games): ' + await response.text());
    
    const data = await response.json();
    if (data.length === 0) break;
    
    todos = todos.concat(data);
    console.log(`   ... ${todos.length} juegos obtenidos`);
    offset += limit;
    await new Promise(r => setTimeout(r, 250));
  }

  return todos;
}

async function volcarJuegos(juegos) {
  console.log('💾 Volcando juegos y relaciones en la base de datos...\n');
  let juegosInsertados = 0;

  for (const juego of juegos) {
    try {
      // 1. VERIFICAR SI EL JUEGO YA EXISTE
      const [existe] = await db.query('SELECT id_juego FROM juego WHERE titulo = ?', [juego.name]);
      if (existe && existe.length > 0) {
        console.log(`⏭️  Omitiendo "${juego.name}" (Ya existe)`);
        continue;
      }

      // 2. FORMATEAR DATOS
      const descripcion = juego.summary || 'Sin descripción disponible.';
      // Convertir el timestamp UNIX a formato fecha de PostgreSQL (YYYY-MM-DD)
      const fechaLanzamiento = new Date(juego.first_release_date * 1000).toISOString().split('T')[0];
      // Arreglar la portada (poner https y mejor resolución)
      const portada = juego.cover?.url ? juego.cover.url.replace('t_thumb', 't_cover_big').replace('//', 'https://') : null;

      // 3. INSERTAR JUEGO (Usando insertId de MySQL para obtener el ID recién generado)
      const [resultJuego] = await db.query(
        'INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (?, ?, ?, ?)',
        [juego.name, fechaLanzamiento, descripcion, portada]
      );
      
      const idJuego = resultJuego.insertId;

      // 4. GESTIONAR RELACIONES (Tablas intermedias)
      
      if (juego.platforms) {
        for (const p of juego.platforms) {
          if (p.name) await db.query('INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (?, ?)', [idJuego, p.name]);
        }
      }

      if (juego.genres) {
        for (const g of juego.genres) {
          if (g.name) await db.query('INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (?, ?)', [idJuego, g.name]);
        }
      }

      if (juego.involved_companies) {
        for (const c of juego.involved_companies) {
          if (c.developer && c.company?.name) await db.query('INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (?, ?)', [idJuego, c.company.name]);
        }
      }

      console.log(`✅ Insertado: ${juego.name}`);
      juegosInsertados++;
    } catch (error) {
      console.error(`❌ Error al procesar "${juego.name}":`, error.message);
    }
  }
  
  console.log(`\n🎉 Proceso finalizado. Se han insertado ${juegosInsertados} juegos nuevos con sus relaciones.`);
}

// Función principal
async function iniciar() {
  try {
    const token = await obtenerToken();
    
    // 1. Descargar y volcar catálogo de desarrolladoras (Sin límite)
    const empresas = await obtenerDesarrolladoras(token);
    await volcarDesarrolladoras(empresas);

    // 2. Descargar y volcar catálogo de plataformas (Sin límite)
    const plataformas = await obtenerPlataformas(token);
    await volcarPlataformas(plataformas);

    // 3. Descargar y volcar catálogo de géneros (Sin límite)
    const generos = await obtenerGeneros(token);
    await volcarGeneros(generos);

    // 4. Descargar y volcar juegos con sus relaciones (Sin límite)
    const juegos = await obtenerJuegos(token);
    await volcarJuegos(juegos);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error fatal en el script:', error);
    process.exit(1);
  }
}

iniciar();