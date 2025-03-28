import app from "./app.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const APP_PORT: number = Number(process.env.APP_PORT) || 3000;

// Start server
app.listen(APP_PORT, (): void => {
  console.log(`Server is running on port ${APP_PORT}`);
});
