import express from "express";
import auth from "../middlewares/auth.middleware.js";
import admin from "../middlewares/admin.middleware.js";
import {
  createUser,
  deleteOrder,
  deleteUser,
  getAllOrders,
  getAllProducts,
  getOrdersInfo,
  getUsers,
  updateOrderStatus,
  updateUserInfo,
} from "../controllers/admin.controllers.js";

const router = express.Router();

router
  .route("/users")
  .get(auth, admin, getUsers)
  .post(auth, admin, createUser);

router
  .route("/users/:id")
  .put(auth, admin, updateUserInfo)
  .delete(auth, admin, deleteUser);

router
  .route("/products")
  .get(auth, admin, getAllProducts);

router
  .route("/orders")
  .get(auth, admin, getAllOrders);

router
  .route("/orders/info")
  .get(auth, admin, getOrdersInfo);
router
  .route("/orders/:id")
  .put(auth, admin, updateOrderStatus)
  .delete(auth, admin, deleteOrder);

export default router;
