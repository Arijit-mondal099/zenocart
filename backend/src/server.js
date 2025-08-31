import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import dbConnection from "./db/dbConnection.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import checkoutRouter from "./routes/checkout.routes.js";
import orderRouter from "./routes/order.routes.js";
import uploadRouter from "./routes/uploads.routes.js";
import subscriberRouter from "./routes/subscriber.routes.js";
import adminRouter from "./routes/admin.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4001;
await dbConnection();

// Middlewares
app.use(
  cors({
    origin: ["http://locakhost:5173", process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.static("public"));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.get("/", (req, res) => res.send("Wellcome to the ZenoCart!"));
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", orderRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/subscribers", subscriberRouter);
app.use("/api/admin", adminRouter);

// Serving frontend
import path from "path";
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname, "../frontend/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening at poat: ${PORT}`);
});
