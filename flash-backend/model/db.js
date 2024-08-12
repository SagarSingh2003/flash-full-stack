import mysql from "mysql2";
import 'dotenv/config';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
}).promise();



export default pool;

const [rows] = await pool.query("SELECT * FROM flashcard");
console.log(rows);