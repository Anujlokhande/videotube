import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//route import

import userRoter from "./routes/user.routes.js";

//rotes declaration
app.use("/api/v1/users", userRoter);

export { app };
