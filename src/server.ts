import 'dotenv/config';
import app from './app';

const BACKEND_PORT: number = parseInt(process.env.SERVER_PORT ?? "2525", 10);

app.listen(BACKEND_PORT, () => {
    console.log(`HTTP Server listening on port: http://localhost:${BACKEND_PORT}`)
})