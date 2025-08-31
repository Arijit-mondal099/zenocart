import Checkout from "../models/checkout.model.js";
import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import ApiError from "../utils/ApiErr.js";
import ApiResponse from "../utils/ApiRes.js";
import { razorpay } from "../utils/razorpay.js";
import crypto from "crypto";

/**
 * @route POST /api/checkout
 * @desc Create checkout section
 * @access Private
 */
export const createCheckout = async (req, res) => {
  try {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems?.length === 0) {
      throw new ApiError(400, "Checkout items not provieded!");
    }

    const checkout = await Checkout.create({
      user: req.user.id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    return res.status(201).json(new ApiResponse(201, "Checkout section created", checkout));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route POST /api/checkout/create-payment/:id
 * @desc Create Razorpay order
 * @access Private
 */
export const createPaymentOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const checkout = await Checkout.findById(id);

    if (!checkout) throw new ApiError(404, "Checkout not found!");
    if (checkout.isPaid) throw new ApiError(400, "Already paid!");

    const options = {
      amount: checkout.totalPrice * 100, // in paise
      currency: "INR",
      receipt: checkout._id.toString(),
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json(new ApiResponse(200, "Payment created successfully", order));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route PUT /api/checkout/verify-payment
 * @desc Validate after payment
 * @access Private
 */
export const validPaymentOrder = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Step 1: validate signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign)
      throw new ApiError(400, "Invalid razorpay signature!");

    // Step 2: fetch order info
    const orderInfo = await razorpay.orders.fetch(razorpay_order_id);

    if (!orderInfo || orderInfo.status !== "paid")
      throw new ApiError(400, "Payment not completed. Please try again!");

    // Step 3: update checkout as paid
    const checkout = await Checkout.findById(orderInfo.receipt);

    if (!checkout) throw new ApiError(404, "Checkout not found!");

    checkout.isPaid = true;
    checkout.paymentStatus = "paid";
    checkout.paidAt = Date.now();
    checkout.paymentDetails = {
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paymentGateway: "razorpay",
      amount: orderInfo.amount,
      currency: orderInfo.currency,
    };

    await checkout.save();

    return res.status(200).json(new ApiResponse(200, "Payment verified successfully", checkout));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route POST /api/checkout/finalize/:id
 * @desc Create order for user
 * @access Private
 */
export const finalizedOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const checkout = await Checkout.findById(id);

    if (!checkout) throw new ApiError(404, "Checkout section not found!");
    if (!checkout.isPaid || checkout.isFinalized) throw new ApiError(400, "Checkout isn't paid or alredy finalized!!");

    // create order
    const order = await Order.create({
      user: checkout.user,
      orderItems: checkout.checkoutItems,
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      totalPrice: checkout.totalPrice,
      isPaid: checkout.isPaid,
      paidAt: checkout.paidAt,
      paymentStatus: checkout.paymentStatus,
      paymentDetails: checkout.paymentDetails,
    });

    // mark finalized as true
    checkout.isFinalized = true;
    checkout.finalizedAt = Date.now();
    await checkout.save();

    // delete user cart associated data
    await Cart.findOneAndDelete({ userId: checkout.user });

    return res.status(201).json(new ApiResponse(201, "Order finalized", order));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};
