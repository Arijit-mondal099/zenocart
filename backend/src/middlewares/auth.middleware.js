import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiErr.js";

const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers["authorization"]?.split("Bearer ")[1];

    if (!token) {
      throw new ApiError(401, "Unauthorized user!");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken?.id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid or expired token!");
    }

    req.user = { id: user._id, role: user.role };
    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized user or token not provided!");
  }
};

export default auth;
