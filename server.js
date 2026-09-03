require("dotenv").config();

const express = require("express");
const appRoute = require("./src/routes");
const response = require("./src/middlewares/response.middleware");
const json = require("./src/middlewares/json.middleware");
const notFound = require("./src/middlewares/notFound.middleware");
const errorHandler = require("./src/middlewares/errorHandler.middleware");

require("./src/config/database");

const app = express();
const port = 3000;

app.use(json);
app.use(response);

app.use("/api", appRoute);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Running on localhost:" + port);
});
