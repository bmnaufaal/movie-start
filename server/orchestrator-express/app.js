if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const router = require("./routers");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`Orchestrator-express listening on port ${port}`);
});
