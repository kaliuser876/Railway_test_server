// client/server.js
import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5173;

// Serve static files from the dist folder
app.use(express.static(path.join(process.cwd(), "dist")));

// SPA fallback for Vite
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
