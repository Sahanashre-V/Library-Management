import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";

import router from "./Routes/route.js";

const app = express();
app.use(cors());
app.use(express.json());

// Get __dirname equivalent in ES Modules
// const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.originalUrl}`, { functionName: 'RequestMiddleware' });
  next();
});

app.use("/api", router);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "Frontend", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`, { functionName: 'ServerStart' });
});
