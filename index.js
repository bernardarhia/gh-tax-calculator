const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv/config")
const corsOptions = {
    credentials:true,
    origin:"http://localhost:3000"
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Import Routes
const payeRouter = require("./routes/paye")
app.use("/api/paye", payeRouter);


// Listen to the current port
app.listen(process.env.PORT || 3000)
