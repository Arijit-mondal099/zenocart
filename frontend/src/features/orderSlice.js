import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

const initialState = {
  orders: [],
  order: null,
  totalOrders: 0,
  loading: false,
  error: null,
};

// Async thunk for fetching all orders
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/orders");
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for fetching a single order by ID
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/orders/${orderId}`);
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.totalOrders = state.orders?.length;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // *** GET Order info
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
