import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import SSLCommerz from "./routes/sslCommerz.js";
import Bkash from "./routes/bkashRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//routes

app.use("/sslcommerz", SSLCommerz);
app.use("/bkash", Bkash);
app.use("/", express.static("build"));
//routes

//Catch All
app.use("*", express.static("build"));

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: res.status,
    message: "Invalid Path, Please Check again.",
  });
});

export default app;
