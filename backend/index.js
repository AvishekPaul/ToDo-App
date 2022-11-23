const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/indexRoute");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;
const app = express();

app.use(cors()); //middleware for cross-origin-request
app.use(morgan()); //middleware for logging HTTP requests
app.use(express.json()); //middleware for getting JSON responses

app.use("/api", routes); //for routing purposes

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
});

//connect database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URI);
    console.log("Database connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

//listen on port
app.listen(port, () => {
  connectDB();
  console.log("listening");
});
