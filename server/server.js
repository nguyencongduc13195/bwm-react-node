const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/dev");
const rentalRoutes = require("./routes/Rental");
const app = express();
const PORT = process.env.PORT || 3001;
app.use("/api/v1/rental", rentalRoutes);
mongoose.connect(config.mongoURI, { useNewUrlParser: true });

app.listen(PORT, () => console.log("I am running"));
