import sql from "mssql";
const config: sql.config = {
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  server: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "",
};

export async function connectToDatabase(): Promise<sql.ConnectionPool> {
  try {
    const pool = await sql.connect(
      `Server=${config.server};Database=${config.database};User Id=${config.user};Password=${config.password};Encrypt=true`
    );
    return pool;
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
}
