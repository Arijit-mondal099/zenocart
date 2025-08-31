import Order from "../models/order.model.js";
import ApiError from "../utils/ApiErr.js";
import ApiResponse from "../utils/ApiRes.js";

/**
 * @route GET /api/orders
 * @desc Get all my orders
 * @access Private
 */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, "fetched", orders));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route GET /api/orders/:id
 * @desc Get order details by id
 * @access Private
 */
export const myOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
      throw new ApiError(404, "Order details not found!");
    }
    return res.status(200).json(new ApiResponse(200, "fetched", order));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};
