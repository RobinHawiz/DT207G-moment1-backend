// Import environment variables before any other modules touch process.env.
import "./config/env.js";

import express, { Express } from "express";
import { ConnectionPool } from "mssql";
import { connectToDatabase } from "./config/db.js";
import { coursesRoutes } from "./routes/coursesRoutes.js";
import { corsMiddleware } from "./middlewares/corsMiddleware.js";

/**
 * Initializes the Express application with all middleware and route handlers.
 *
 * Note: Environment variables are loaded before this function runs via the top-level import of `./config/env.js`.
 * - Connects to the database
 * - Mounts JSON middleware
 * - Attaches route handlers for /courses
 *
 * @returns A fully configured Express application instance
 */
export async function createApp(): Promise<express.Express> {
  const app: Express = express();
  // Connect to db
  const pool: ConnectionPool = await connectToDatabase();
  const routes = coursesRoutes(pool);
  // Middlewares
  app.use(corsMiddleware);
  app.use(express.json());
  // Health check route
  app.get("/health", (_, res) => {
    res.status(200).send("OK");
  });
  // Mount course-related routes
  app.use("/courses", routes);

  return app;
}
