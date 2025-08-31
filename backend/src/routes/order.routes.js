import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  getMyOrders,
  myOrderDetails,
} from "../controllers/order.controllers.js";

const router = express.Router();

router.route("/").get(auth, getMyOrders);
router.route("/:id").get(auth, myOrderDetails);

export default router;
