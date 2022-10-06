const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var cors = require("cors");
const transactions = require("./routes/transactions");

dotenv.config({ path: "./congfig/config.env" });

const mongodb_uri = process.env.MONGO_URL || "mongodb://localhost/Tradelog";
mongoose.connect(
  mongodb_uri,
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

app.use("/api/v1/cases", transactions);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
