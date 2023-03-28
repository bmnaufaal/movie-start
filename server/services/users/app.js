if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 4001;
const cors = require("cors");
const router = require("./routers");
const { mongoConnect } = require("./config/mongoConnection");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);

mongoConnect().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
