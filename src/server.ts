import { createApp } from "./app.js";
import { Express } from "express";

async function startServer() {
  const APP_PORT: number = Number(process.env.APP_PORT) || 3000;
  const app: Express = await createApp();

  app.listen(APP_PORT, () => {
    console.log(`Server running on port 3000`);
  });
}

startServer();
