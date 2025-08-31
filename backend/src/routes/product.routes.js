import express from "express";
import {
  createProduct,
  deleteProduct,
  getBestSellerProducts,
  getNewArrivalProducts,
  getProductByID,
  getProducts,
  getSimilarProducts,
  updateProduct,
} from "../controllers/product.controllers.js";
import auth from "../middlewares/auth.middleware.js";
import admin from "../middlewares/admin.middleware.js";

const router = express.Router();

router.route("/")
  .get(getProducts)
  .post(auth, admin, createProduct);

router.route("/new-arrivals").get(getNewArrivalProducts)
router.route("/best-seller").get(getBestSellerProducts);
router.route("/similar/:id").get(getSimilarProducts);
  
router.route("/:id")
  .get(getProductByID)
  .put(auth, admin, updateProduct)
  .delete(auth, admin, deleteProduct);

export default router;
