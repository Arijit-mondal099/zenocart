import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  createCheckout,
  createPaymentOrder,
  validPaymentOrder,
  finalizedOrder,
} from "../controllers/checkout.controllers.js";

const router = express.Router();

router.route("/").post(auth, createCheckout);
router.route("/:id/create-payment").post(auth, createPaymentOrder);
router.route("/verify-payment").put(auth, validPaymentOrder);
router.route("/:id/finalize").post(auth, finalizedOrder);

export default router;
