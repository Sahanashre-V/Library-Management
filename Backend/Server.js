const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./Routes/route")
const reportsRouter = require("./Routes/reports")

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use('/api/reports', reportsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
});
