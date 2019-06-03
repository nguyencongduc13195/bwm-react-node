const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/dev");
const rentalRoutes = require("./routes/Rental");
const userRoutes = require("./routes/User");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use("/api/v1/rental", rentalRoutes);
app.use("/api/v1/user", userRoutes);
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Database connected"));

app.listen(PORT, () => console.log("I am running"));
