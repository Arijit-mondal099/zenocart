import express from "express";
import ApiError from "../utils/ApiErr.js";
import Subscriber from "../models/subscriber.model.js";
import ApiResponse from "../utils/ApiRes.js";

const router = express.Router();

/**
 * @route POST /api/subscriber
 * @desc Handle newsletter subscription
 * @access Public
 */
router.route("/").post(async (req, res) => {
  try {
    const { email } = req.body;

    const isSubscriberExist = await Subscriber.findOne({ email });

    if (isSubscriberExist) {
      throw new ApiError(400, "Subscriber alredy exist with email!");
    }

    const subscriber = await Subscriber.create({ email });

    return res
      .status(201)
      .json(new ApiResponse(201, "A new subscriber created", subscriber));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
});

export default router;
