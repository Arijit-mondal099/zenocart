import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

// Async thunk for create checkout session
export const createCheckoutSession = createAsyncThunk(
  "checkout/createCheckoutSession",
  async (checkoutData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/checkout", checkoutData);
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    session: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default checkoutSlice.reducer;
