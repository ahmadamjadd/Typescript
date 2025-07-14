// backend/server.ts
import { initDB } from "./db/database";
import { handleRoutes } from "./routes";

const server = Bun.serve({
  port: 3000,
  fetch: handleRoutes,
});

await initDB();
console.log("Server running at http://localhost:3000");
