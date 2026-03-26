import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;

dotenv.config();
const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized : false,
    },
});

pool.connect()
    .then(client => {
        console.log("DB Connected");
        client.release();
    })
    .catch(err => {
        console.log("DB ERROR : ",err);
    })


export default pool;