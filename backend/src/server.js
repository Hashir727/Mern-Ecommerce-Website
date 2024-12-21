import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config({});

const port = process.env.PORT || 3000;
const app = express();
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

// api endpoint
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
// app.use("/api/upload", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
