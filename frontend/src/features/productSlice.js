import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

const initialState = {
  selectedProduct: null,
  products: [],
  pagination: {},
  similarProducts: [],
  newArrivals: [],
  bestSellingProducts: [],
  loading: false,
  error: null,
};

// Async thunk for fetching products by collection and optional filters
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (
    {
      collection,
      category,
      color,
      size,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      material,
      brand,
      limit = 12,
      page,
    },
    { rejectWithValue }
  ) => {
    try {
      const query = new URLSearchParams();
      if (collection) query.append("collection", collection);
      if (category) query.append("category", category);
      if (color) query.append("color", color);
      if (size) query.append("size", size);
      if (gender) query.append("gender", gender);
      if (maxPrice) query.append("maxPrice", maxPrice);
      if (minPrice) query.append("minPrice", minPrice);
      if (sortBy) query.append("sortBy", sortBy);
      if (search) query.append("search", search);
      if (material) query.append("material", material);
      if (brand) query.append("brand", brand);
      if (limit) query.append("limit", limit);
      if (page) query.append("page", page);

      const response = await axiosInstance.get(
        `/api/products?${query.toString()}`
      );

      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for fetching single product
export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
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

// Async thunk for fetching similar products
export const fetchSimilarProducts = createAsyncThunk(
  "product/fetchSimilarProducts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/products/similar/${id}`);
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for update product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/products/${id}`, {
        productData,
      });
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for get new arrivals
export const fetchNewArrivals = createAsyncThunk(
  "product/fetchNewArrivals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/products/new-arrivals`);
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

// Async thunk for best selling products
export const fetchBestSellingProducts = createAsyncThunk(
  "product/fetchBestSellingProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/products/best-seller`);
      return response.data?.value;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // *** fetching products by filters
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });

    // *** fetching single product
    builder.addCase(fetchProductDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });

    // *** fetching similar products
    builder.addCase(fetchSimilarProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSimilarProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.similarProducts = action.payload;
      state.error = null;
    });
    builder.addCase(fetchSimilarProducts.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });

    // *** update product
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const updatedProduct = action.payload;
      const index = state.products.findIndex(
        (p) => p._id === updateProduct._id
      );
      if (index !== -1) state.products[index] = updatedProduct;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });

    // *** fetching new arrivals
    builder.addCase(fetchNewArrivals.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchNewArrivals.fulfilled, (state, action) => {
      state.loading = false;
      state.newArrivals = action.payload;
      state.error = null;
    });
    builder.addCase(fetchNewArrivals.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });

    // *** fetching best selling products
    builder.addCase(fetchBestSellingProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBestSellingProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.bestSellingProducts = action.payload;
      state.error = null;
    });
    builder.addCase(fetchBestSellingProducts.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { } = productSlice.actions;
export default productSlice.reducer;
