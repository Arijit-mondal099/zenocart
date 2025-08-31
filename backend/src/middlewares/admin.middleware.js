import ApiError from "../utils/ApiErr.js";

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  throw new ApiError(401, "Unauthorized admin!");
};

export default admin;
