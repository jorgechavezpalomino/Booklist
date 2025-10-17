import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false},
});

try {
    await client.connect();
    console.log("Connected to PostgresSQL")
} catch (err) {
    console.error("Error to connect", err);
}

export default client;