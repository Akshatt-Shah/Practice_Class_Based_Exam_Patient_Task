import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";

import "cookie-parser";
import cookieParser from "cookie-parser";
import userroute from "./src/routes/Userroutes";
import Trouter from "./src/routes/Treatment.routes";
config();
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(userroute);
app.use(Trouter);

let portString = process.env.PORT;
if (!portString) {
  portString = "5000";
}
app.listen(portString, () => {
  console.log(`The Server running on this ${portString}`);
});
const Mongo_Url = process.env.Mongo_Url;
if (Mongo_Url) {
  mongoose
    .connect(Mongo_Url)
    .then(() => {
      console.log("MongoDB connected...");
    })
    .catch((err) => {
      console.error("Mongo DB Not Connected ");
    });
}
