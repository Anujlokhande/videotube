import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDb from "./db/index.js";
import { app } from "./app.js";

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Listening On port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed To Connect Database ", err);
  });
