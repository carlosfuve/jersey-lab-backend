import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

const isLocal: boolean = process.env.NODE_ENV === 'development';

const DATABASE_HOST: string = (isLocal ? process.env.DB_HOST_L : process.env.DB_HOST) || "";
const DATABASE_PORT: number = parseInt(((isLocal ? process.env.DB_PORT_L : process.env.DB_PORT) || "5600"), 10);
const DATABASE_PSW: string = (isLocal ? process.env.DB_PSW_L : process.env.DB_PSW) || "";

const DATABASE_NAME: string = (isLocal ? process.env.DB_NAME_L : process.env.DB_NAME) || "";
const DATABASE_USER: string = (isLocal ? process.env.DB_USER_L : process.env.DB_USER) || "";


const pool = new Pool({
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    password: DATABASE_PSW,

    user: DATABASE_USER,
    database: DATABASE_NAME,

    ssl: { rejectUnauthorized: false },
    max: 15 // Max number of connections
})

export default pool;