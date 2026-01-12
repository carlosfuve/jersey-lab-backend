import 'dotenv/config';
import app from './app';
import pool from './database/init';

const BACKEND_PORT: number = parseInt(process.env.SERVER_PORT ?? "2525", 10);

async function initDatabase() {
    try {
        await pool.query('SELECT NOW()')
        console.log('✅ Conexión establecida con MySQL');
    } catch (e) {
        console.log(e)
        console.error('❌ Error al conectar con MySQL:');
        process.exit(1);
    }

}


app.listen(BACKEND_PORT, async () => {
    await initDatabase();
    console.log(`HTTP Server listening on port: http://localhost:${BACKEND_PORT}`)
})