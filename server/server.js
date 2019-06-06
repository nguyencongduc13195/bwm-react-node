const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/dev");
const rentalRoutes = require("./routes/Rental");
const userRoutes = require("./routes/User");
const bookingRoutes = require("./routes/Booking");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
// app.use(cors());
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bookings", bookingRoutes);
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Database connected"));

app.listen(PORT, () => console.log("I am running"));
