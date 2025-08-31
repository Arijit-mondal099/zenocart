import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiErr.js";
import ApiResponse from "../utils/ApiRes.js";

/**
 * @route GET /api/admin/users
 * @desc Get all user
 * @access Private/admin only
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    return res.status(200).json(new ApiResponse(200, "Users fetched", users));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route POST /api/admin/users
 * @desc Create an new user
 * @access Private/admin only
 */
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist) {
      throw new ApiError(400, "User alredy exist with creadentials!");
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role ?? "customer",
    });

    return res.status(201).json(
      new ApiResponse(201, "New user created", {
        ...user._doc,
        password: undefined,
      })
    );
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route PUT /api/admin/users/:id
 * @desc Update user info like name, email and role
 * @access Private/admin only
 */
export const updateUserInfo = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      throw new ApiError(404, "User not found!");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.role = role ?? user.role;

    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, "User info updated", user));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route DELETE /api/admin/users/:id
 * @desc Delete user by id
 * @access Private/admin only
 */
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json(new ApiResponse(200, "User deleted"));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route GET /api/admin/products
 * @desc Get all products
 * @access Private/admin only
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res
      .status(200)
      .json(new ApiResponse(200, "Products fetched", products));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route GET /api/admin/orders
 * @desc Get all orders
 * @access Private/admin only
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 }).populate("user", "name");
    return res.status(200).json(new ApiResponse(200, "Orders fetched", orders));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route GET /api/admin/orders/info 
 * @desc Get all orders
 * @access Private/admin only
 */
export const getOrdersInfo = async (req, res) => {
  try {
    const totalCompletedOrders = await Order.find({ isDelivered: true }).countDocuments();
    const totalPendingOrders = await Order.find({ isDelivered: false, status: { $ne: "cancelled" } }).countDocuments();
    const totalCancelledOrders = await Order.find({ status: "cancelled" }).countDocuments();
    return res.status(200).json(new ApiResponse(200, "seccess", { totalCompletedOrders, totalPendingOrders, totalCancelledOrders }));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
}

/**
 * @route PUT /api/admin/orders/:id
 * @desc Upadet order status
 * @access Private/admin only
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id).populate("user", "name");

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    if (status === "delivered") {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    } else if (status === "cancelled") {
      order.isDelivered = false;
      order.cancelledAt = Date.now();
    }

    order.status = status ?? order.status;
    await order.save();

    return res
      .status(200)
      .json(new ApiResponse(200, "Order status updated", order));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route DELETE /api/admin/orders/:id
 * @desc Delete an order
 * @access Private/admin only
 */
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    return res.status(200).json(new ApiResponse(200, "Order deleted"));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};
