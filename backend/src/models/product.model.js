import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
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
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },

    sizes: {
      type: [String],
      required: true,
    },

    colors: {
      type: [String],
      required: true,
    },

    collections: {
      type: String,
      required: true,
    },

    material: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["men", "women", "others"],
    },

    images: [
      {
        url: String
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
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    metaTitle: {
      type: String,
    },

    metaDescription: {
      type: String,
    },

    metaKeywords: {
      type: [String],
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
