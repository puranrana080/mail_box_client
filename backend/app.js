import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import userRoutes from "./routes/user.js";
import mailRoutes from "./routes/mail.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  return res.send("Hello");
});
app.use("/api/user", userRoutes);
app.use("/api/mail",mailRoutes)


const PORT = process.env.PORT;

app.listen(PORT, () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("MONGODB Database connected"))
      .catch((err) => console.log("Error connecting MOngoDB", err));
    console.log("Listening to port ", PORT);
  } catch (err) {
    console.log("Something went wrong", err);
  }
});
