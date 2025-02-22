const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./Routes/route")

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
});
