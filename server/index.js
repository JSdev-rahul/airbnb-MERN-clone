const express = require("express");
var cors = require("cors");
const route = require("./routes/route.js");
const Connection = require("./database/db.js");
const app = express();
const PORT = 5252;
const path = require("path");

Connection();
app.use(express.json());

const uploadsDir = path.join(__dirname, "/uploads");
app.use("/uploads", express.static(uploadsDir));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use("/", route);

app.listen(PORT, () => {
  console.log(`server start --port ${PORT} `);
});
