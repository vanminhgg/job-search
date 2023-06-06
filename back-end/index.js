require("dotenv").config();
const express = require("express");

const cors = require("cors");

const searchRoute = require("./routes/searchRoute");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/", searchRoute);

app.listen(8000, () => {
  console.log(`app is running on port 8000`);
});
