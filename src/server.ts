import { createApp } from "./app.js";
import { Express } from "express";

/**
 * Initializes and starts the Express server.
 *
 * Reads the port from the environment variable `APP_PORT`, falling back to 3000 if not set.
 * Awaits the app initialization (which sets up middleware, routes, etc.)
 * and starts listening for incoming HTTP requests.
 */
async function startServer() {
  const APP_PORT: number = Number(process.env.APP_PORT) || 3000;
  const app: Express = await createApp();

  app.listen(APP_PORT, () => {
    console.log(`Server running on port ${APP_PORT}`);
  });
}

startServer();
