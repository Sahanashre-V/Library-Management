require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const logger = require("./Utils/logger");

const router = require("./Routes/route");
const reportsRouter = require("./Routes/reports");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.originalUrl}`, { functionName: 'RequestMiddleware' });
  next();
});

app.use("/api", router);
app.use('/api/reports', reportsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`, { functionName: 'ServerStart' });
});