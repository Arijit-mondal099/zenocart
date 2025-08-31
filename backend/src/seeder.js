import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import Order from "./models/order.model.js";
import Cart from "./models/cart.model.js";
import Checkout from "./models/checkout.model.js";
import Subscriber from "./models/subscriber.model.js";
import { products } from "./constants.js";

// Replace with your MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);

    // Clear existing data
    await User.deleteMany({});
    await Cart.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Checkout.deleteMany({});
    await Subscriber.deleteMany({});

    // Create sample users
    const user = await User.create({
      name: "arijit mondal",
      email: "arijitm717@gmail.com",
      password: "arijit1234",
      role: "admin",
    });

    // Create sample products
    // const productsWithUser = products.map(product => ({ ...product, user: user._id }));
    // await Product.insertMany(productsWithUser);

    console.log("Seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
