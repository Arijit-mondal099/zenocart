import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import ApiError from "../utils/ApiErr.js";
import ApiResponse from "../utils/ApiRes.js";

// *** Helper fun to get a cart by user id or guest id
export const getCart = async (userId, guestId) => {
  try {
    if (userId) return await Cart.findOne({ userId });
    else if (guestId) return await Cart.findOne({ guestId });
    else null;
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route POST /api/cart
 * @desc Add a product to the cart for a guest or logged in user
 * @access Public
 */
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    const qty = Number(quantity);
    if (isNaN(qty) || qty <= 0) throw new ApiError(400, "Invalid quantity");

    const product = await Product.findById(productId);
    if (!product) throw new ApiError(404, "Product not found!");

    const cart = await getCart(userId, guestId);

    /**
     * if cart is exist then update product quantity and price or add new product in the cart
     * else create an new cart for user or guest
     */
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId && p.size === size && p.color === color
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += qty;
        cart.products[productIndex].price = product.discountPrice * cart.products[productIndex].quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          price: product.discountPrice * qty,
          image: product.images[0].url,
          color,
          size,
          quantity: qty,
        });
      }

      cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price, 0);
      await cart.save();

      return res.status(200).json(new ApiResponse(200, "Cart updated successfully", cart));
    } else {
      const newCart = await Cart.create({
        userId: userId || undefined,
        guestId: guestId || "$guestuser-" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            price: product.discountPrice * qty,
            image: product.images[0].url,
            color,
            size,
            quantity: qty,
          },
        ],
        totalPrice: product.discountPrice * qty,
      });

      return res.status(201).json(new ApiResponse(201, "Product added to cart", newCart));
    }
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route PUT /api/cart
 * @desc Update product quantity
 * @access Puplic
 */
export const updateProductQuantity = async (req, res) => {
  try {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    const product = await Product.findById(productId);
    if (!product) throw new ApiError(404, "Product not found!");

    const cart = await getCart(userId, guestId);
    if (!cart) throw new ApiError(404, "Cart not found!");

    const productIndex = cart?.products.findIndex(
      (p) => p.productId.toString() === productId && p.size === size && p.color === color
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
        cart.products[productIndex].price = product.discountPrice * cart.products[productIndex].quantity;
      } else {
        cart.products.splice(productIndex, 1); // delete automatically
      }

      cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price, 0);
      await cart.save();

      return res.status(200).json(new ApiResponse(200, "Product quantity updated", cart));
    } else {
      throw new ApiError(404, "Product not found!");
    }
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route DELETE /api/cart
 * @desc Delete product from the cart
 * @access Puplic
 */
export const deleteProduct = async (req, res) => {
  try {
    const { productId, size, color, guestId, userId } = req.body;

    const product = await Product.findById(productId);
    if (!product) throw new ApiError(404, "Product not found!");

    const cart = await getCart(userId, guestId);
    if (!cart) throw new ApiError(404, "Cart not found!");

    const productIndex = cart?.products.findIndex(
      (p) => p.productId.toString() === productId && p.size === size && p.color === color
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price, 0);

      await cart.save();

      return res.status(200).json(new ApiResponse(200, "Product delete successfully", cart));
    } else {
      throw new ApiError(404, "Product not found!");
    }
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route GET /api/cart
 * @desc Get logged-in user or guest cart
 * @access Puplic
 */
export const getUserOrGuestCart = async (req, res) => {
  try {
    const { userId, guestId } = req.query;

    const cart = await getCart(userId, guestId);
    if (!cart) throw new ApiError(404, "User or Guest cart not found!");

    return res.status(200).json(new ApiResponse(200, "Cart data founded successfully", cart));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route POST /api/cart/merge
 * @desc Merge guest cart and user cart on login
 * @access Private
 */
export const merge = async (req, res) => {
  try {
    const { guestId } = req.body;

    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ userId: req.user.id });

    // If guest cart is empty and user cart exists, then already merged
    if (!guestCart || guestCart.products.length === 0) {
      if (userCart) {
        return res.status(200).json(new ApiResponse(200, "Cart merge successfully", userCart));
      }
      throw new ApiError(400, "Guest cart not found or guest cart is empty!");
    }

    // If both carts exist then merge merge
    // Loop on guest user products and check that, if product is alredy exist on user cart then update quantity and price, if not exist then add as new products on user cart
    if (userCart) {
      guestCart.products.forEach((gp) => {
        const proIdx = userCart.products.findIndex(
          (p) => p.productId.toString() === gp.productId.toString() && p.color === gp.color && p.size === gp.size
        );

        if (proIdx > -1) {
          userCart.products[proIdx].quantity += gp.quantity;
          userCart.products[proIdx].price += gp.price * gp.quantity;
        } else {
          userCart.products.push(gp);
        }
      });

      // recalculate total
      userCart.totalPrice = userCart.products.reduce((acc, pro) => acc + pro.price * pro.quantity, 0);

      await userCart.save();
      await Cart.findOneAndDelete({ guestId });

      return res.status(200).json(new ApiResponse(200, "Cart merge successfully", userCart));
    }

    // If no user cart exists, then convert guest cart to user cart
    guestCart.userId = req.user.id;
    guestCart.guestId = undefined;

    await guestCart.save();

    return res.status(200).json(new ApiResponse(200, "Cart merge successfully", guestCart));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};
