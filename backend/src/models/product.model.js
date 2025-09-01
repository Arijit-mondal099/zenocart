import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    brand: {
      type: String,
      lowercase: true,
      trim: true,
    },
    sizes: {
      type: [String],
      required: true,
      lowercase: true,
      trim: true,
    },
    colors: {
      type: [String],
      required: true,
      lowercase: true,
      trim: true,
    },
    collections: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    material: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["men", "women", "others"],
      lowercase: true,
      trim: true,
    },
    images: [
      {
        url: String,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      lowercase: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metaTitle: {
      type: String,
      lowercase: true,
      trim: true,
    },
    metaDescription: {
      type: String,
      lowercase: true,
      trim: true,
    },
    metaKeywords: {
      type: [String],
      lowercase: true,
      trim: true,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    weight: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
