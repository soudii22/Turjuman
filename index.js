const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const cors = require("cors");

const app = require("./app");

mongoose
  .connect(process.env.DB_URL)
  .then((con) => {
    console.log("DB Connected Succssefully");
  })
  .catch((err) => {
    console.log(`There was and error ${err}`);
    process.exit(1);
  });

const server = app.listen(process.env.PORT || 8001, () => {
  console.log(`Server is running on port ${process.env.PORT || 8001}`);
});
process.on("uncaughtException", (err) => {
  console.log(`uncaughtException error: ${err.name}|${err.message}`);
  server.close(() => {
    console.log("Shutting Down The Server....");
    process.exit(1);
  });
});
