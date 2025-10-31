import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

let sslConfig = false;

if (process.env.USE_SSL === "true") {
  sslConfig = { rejectUnauthorized: false };
}

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: sslConfig,
});

try {
  await client.connect();
  console.log("Connected to PostgresSQL");
} catch (err) {
  console.error("Error to connect", err);
}

export default client;
