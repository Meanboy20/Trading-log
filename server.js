const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var cors = require("cors");
const transactions = require("./routes/transactions");

dotenv.config({ path: "./congfig/config.env" });

mongoose.connect(
  "mongodb://localhost/Tradelog",
  { useNewUrlParser: true },
  { useUnifedTopology: true }
);

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});

db.once("open", () => {
  console.log("Connected to Database");
});

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/v1/transactions", transactions);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
