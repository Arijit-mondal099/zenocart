import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

const guestId = localStorage.getItem("guestId") || "$guestuser-" + new Date().getTime();
localStorage.setItem("guestId", guestId);

const initialState = {
  guestId: guestId,
  user: null,
  loading: false,
  authChecking: true,
  error: null,
};

// async thunk for user login process
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/users/login", userData);
      localStorage.setItem("userInfo", JSON.stringify(response.data?.value));
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network Error");
    }
  }
);

// async thunk for user register process
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/users/register", userData);
      localStorage.setItem("userInfo", JSON.stringify(response.data?.value));
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network Error");
    }
  }
);

// async thunk for get user
export const getLoggedinUser = createAsyncThunk(
  "auth/getLoggedinUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/api/users/profile");
      return res.data?.value;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network Error");
    }
  }
)

// aync thunk for logout process
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/api/users/logout");
      return null;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network Error");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    generateNewGuestId: (state) => {
      const newGuestId = `guest_${Date.now()}`;
      state.guestId = newGuestId;
      localStorage.setItem("guestId", newGuestId);
    },
  },
  extraReducers: (builder) => {
    // *** login user cases
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // *** Register user cases
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // *** Logout user cases
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.guestId = "$guestuser-" + new Date().getTime(); // Reset guestId on logout
      localStorage.setItem("guestId", state.guestId);
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // *** get user profile
    builder.addCase(getLoggedinUser.pending, (state) => {
      state.authChecking = true;
      state.error = null;
    });
    builder.addCase(getLoggedinUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authChecking = false;
      state.error = null;
    });
    builder.addCase(getLoggedinUser.rejected, (state, action) => {
      state.authChecking = false;
      state.error = action.payload;
    })
  },
});

export const { generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;
