const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const scores = require("./routes/api/scores");

const app = express();

// Cors Middleware to allow CORS when running FE and BE locally.
app.use(cors());

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// User Routes
app.use("/api/scores", scores);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
