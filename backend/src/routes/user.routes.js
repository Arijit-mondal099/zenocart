import express from "express";
import {
  loginUser,
  logoutUser,
  profile,
  registerUser,
} from "../controllers/user.controllers.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").post(auth, logoutUser);
router.route("/profile").get(auth, profile);

export default router;
