import User from "../models/user.model.js";
import ApiError from "../utils/ApiErr.js";
import ApiResponse from "../utils/ApiRes.js";
import generateToken from "../utils/genToken.js";

/**
 * @route POST /api/users/register
 * @desc Register an user account
 * @access Public
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new ApiError(400, "Please provide all fields!");
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      throw new ApiError(400, "User alredy exist with credentials!");
    }
    if (password.length < 6) {
      throw new ApiError(400, "Password length must be 6 charaters long!");
    }

    const user = new User({ name, email, password });
    await user.save();

    generateToken({ id: user._id, role: user.role }, res);

    return res.status(201).json(
      new ApiResponse(201, "user register successfully", {
        ...user._doc,
        password: undefined,
      })
    );
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route POST /api/users/login
 * @desc Login an user account
 * @access Public
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Please provide all fields!");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "Invalid email or password!");
    }

    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      throw new ApiError(400, "Invalid email or password!");
    }

    generateToken({ id: user._id, role: user.role }, res);

    return res.status(200).json(
      new ApiResponse(200, "user login successfully", {
        ...user._doc,
        password: undefined,
      })
    );
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route GET /api/users/profile
 * @desc Logged-in user profile
 * @access Private
 */
export const profile = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");
    return res.status(200).json(new ApiResponse(200, "success", user));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route POST /api/users/logout
 * @desc Logged-out user
 * @access Private
 */
export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return res.status(200).json(new ApiResponse(200, "user logged-out successfully"));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};
