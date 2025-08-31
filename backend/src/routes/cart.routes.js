import express from "express";
import {
  addToCart,
  deleteProduct,
  getUserOrGuestCart,
  merge,
  updateProductQuantity,
} from "../controllers/cart.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(addToCart)
  .put(updateProductQuantity)
  .delete(deleteProduct)
  .get(getUserOrGuestCart);

router.route("/merge").post(auth, merge);

export default router;
