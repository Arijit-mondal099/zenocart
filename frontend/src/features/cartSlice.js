import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

// helper fun to fetch cart data from local storage
const fetchCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

// helper fun to save cart data to local storage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState = {
  cartItems: fetchCartFromLocalStorage(),
  loading: false,
  error: null,
};

// Async thunk for fetching cart items by userId/guestId
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const cartItems = await axiosInstance.get(`/api/cart`, {
        params: { userId, guestId },
      });

      return cartItems.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for adding an item to the cart
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/cart`, productData);
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for updating quantity an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { productId, quantity, size, color, guestId, userId }, 
    { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/cart`, 
        { productId, quantity, size, color, guestId, userId }
      );
      return response.data?.value;
    } catch (error) {
      console.log(error)
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for removing an item from the cart
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/cart`, { data });
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for merging guest cart with user cart
export const mergeGuestCartWithUser = createAsyncThunk(
  "cart/mergeGuestCartWithUser",
  async (guestId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/cart/merge`, { guestId });
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseQuantity: (state, action) => {
      const { productId, color, size } = action.payload;
      const pIndex = state.cartItems.products.findIndex(
        (p) => p.productId === productId && p.color === color && p.size === size
      );

      if (pIndex !== -1 ) {
        state.cartItems.products[pIndex].quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const { productId, color, size } = action.payload;
      const pIndex = state.cartItems.products.findIndex(
        (p) => p.productId === productId && p.color === color && p.size === size
      );

      if (pIndex !== -1 && state.cartItems.products[pIndex].quantity !== 0) {
        state.cartItems.products[pIndex].quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.cartItems = null;
      localStorage.removeItem("cart");
    }
  },
  extraReducers: (builder) => {
    //  *** featching cart items
    builder.addCase(fetchCartItems.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
      saveCartToLocalStorage(state.cartItems);
    });
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // *** adding item to cart
    builder.addCase(addItemToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
      saveCartToLocalStorage(state.cartItems);
    });
    builder.addCase(addItemToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // *** updating cart item quantity
    builder.addCase(updateCartItemQuantity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload
      saveCartToLocalStorage(state.cartItems);
    });
    builder.addCase(updateCartItemQuantity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // *** removing item from cart
    builder.addCase(removeItemFromCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
      saveCartToLocalStorage(state.cartItems);
    });
    builder.addCase(removeItemFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // *** merging guest cart with user cart
    builder.addCase(mergeGuestCartWithUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(mergeGuestCartWithUser.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
      saveCartToLocalStorage(state.cartItems);
    });
    builder.addCase(mergeGuestCartWithUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearCart, decreaseQuantity, increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
