import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./database/db.js";
import cloudinary from 'cloudinary'
import cors from 'cors';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});


const app = express();
const port = process.env.PORT || 5000;

//using middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
//importing routes
import userRoutes from "./routes/userRoutes.js";
import podcastRoutes from "./routes/podcastRoutes.js"

//using  routes
app.use("/api/user", userRoutes);
app.use("/api/podcast", podcastRoutes);

app.listen(port, (err) => {
  if (err) {
    console.log("ERROR : ", err);
  } else {
    console.log(`server stared at http://localhost:${port}`);
    connectDb();
  }
});
