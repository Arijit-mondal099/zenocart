import express from "express";
import auth from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import ApiError from "../utils/ApiErr.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiRes.js";

const router = express.Router();

router.route("/").post(auth, upload.single("image"), async (req, res) => {
  try {
    const imageLocalPath = req.file.path;

    if (!imageLocalPath) {
      throw new ApiError(400, "Image not provided!");
    }

    const image = await uploadOnCloudinary(imageLocalPath);

    if (!image?.secure_url) {
      throw new ApiError(400, "Image not uploaded on cloudinary!");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Image uploaded!", { url: image.secure_url }));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
});

export default router;
