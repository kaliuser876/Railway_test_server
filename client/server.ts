// client/server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Must use Railway-provided PORT
const PORT = process.env.PORT;
if (!PORT) {
  throw new Error("PORT not set by Railway");
}

// Serve static files from dist/
app.use(express.static(path.join(__dirname, "dist")));

// SPA fallback for React Router
app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Listen on Railway port and all interfaces
app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
