// Import environment variables before other modules
import "./config/env.js";
import express, { Express } from "express";
import { ConnectionPool } from "mssql";
import { connectToDatabase } from "./config/db.js";

export async function createApp(): Promise<express.Express> {
  const app: Express = express();
  // Connect to db
  const pool: ConnectionPool = await connectToDatabase();

  return app;
}
