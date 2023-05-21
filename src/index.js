require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const mainrouter = require("./routers/main.router");
const path = require("path");
const app = express();
const plansrouter = require("./routers/plans/router");
app.use(express.json({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/", mainrouter.router);
app.use("/plans", plansrouter);
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
