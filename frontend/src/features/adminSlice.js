import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

const initialState = {
  users: [],
  products: [],
  product: null,
  orders: [],
  totalUsers: 0,
  totalProducts: 0,
  totalOrders: 0,
  totalSells: 0,
  totalCompletedOrders: 0,
  totalPendingOrders: 0,
  totalCancelledOrders: 0,
  loading: false,
  error: null,
};

// Async thunk for fetching all users
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/admin/users");
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for createing a new user
export const createUser = createAsyncThunk(
  "admin/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/admin/users", userData);
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for updating a user
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/admin/users/${userId}`,
        userData
      );
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for deleting a user
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/admin/users/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for fetching all products
export const fetchProducts = createAsyncThunk(
  "admin/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/admin/products");
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for fetching product by id
export const fetchProductById = createAsyncThunk(
  "admin/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/products/${id}`);
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for create a new product
export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/products", productData);
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for updating a product
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      console.log(productData, productId)
      const response = await axiosInstance.put(
        `/api/products/${productId}`,
        productData
      );
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for deleting a product
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/products/${productId}`);
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for fetching all orders
export const fetchOrders = createAsyncThunk(
  "admin/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/admin/orders");
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for fetching order info
export const fetchOrdersInfo = createAsyncThunk(
  "order/ordersInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/admin/orders/info");
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for deleting an order
export const deleteOrder = createAsyncThunk(
  "admin/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/admin/orders/${orderId}`
      );
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for updating an order status
export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/admin/orders/${orderId}`, {
        status,
      });
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetch users
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.totalUsers = action.payload.length;
      state.error = null;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle create user
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
      state.totalUsers += 1;
      state.error = null;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle update user
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      );
      if (index !== -1) state.users[index] = action.payload;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.filter(u => u._id !== action.payload);
      state.totalUsers -= 1;
      state.error = null;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle fetch products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.totalProducts = action.payload.length;
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle fetch product by id
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle create product
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
      state.totalProducts += 1;
      state.error = null;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // handle update product
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (productIndex !== -1) state.products[productIndex] = action.payload;
      state.error = null;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle delete product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.totalProducts -= 1;
      state.error = null;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle fetching orders
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.totalOrders = action.payload.length;
      state.totalSells = action.payload.reduce((total, order) => total + order.totalPrice, 0);
      state.error = null;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle fetching orders info
    builder.addCase(fetchOrdersInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrdersInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.totalCompletedOrders = action.payload.totalCompletedOrders;
      state.totalPendingOrders = action.payload.totalPendingOrders;
      state.totalCancelledOrders = action.payload.totalCancelledOrders;
      state.error = null;
    });
    builder.addCase(fetchOrdersInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle delete order
    builder.addCase(deleteOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload.id
      );
      state.totalOrders -= 1;
      state.totalSells -= action.payload.totalPrice;
      state.error = null;
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle updating order status
    builder.addCase(updateOrderStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.loading = false;
      const orderIndex = state.orders.findIndex((order) => order._id === action.payload._id);
      if (orderIndex !== -1) state.orders[orderIndex] = action.payload;
      state.error = null;
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default adminSlice.reducer;
