import Product from "../models/product.model.js";
import ApiError from "../utils/ApiErr.js";
import ApiResponse from "../utils/ApiRes.js";

/**
 * @route POST /api/products
 * @desc Create a new product
 * @access Private(admin)
 */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      numReviews,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      dimensions,
      weight,
    } = req.body;
    const { id } = req.user;

    const product = new Product({
      user: id,
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      numReviews,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      dimensions,
      weight,
    });
    await product.save();

    return res.status(201).json(
      new ApiResponse(201, "Product created successfully", {
        ...product._doc,
      })
    );
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route PUT /api/products/:id
 * @desc Update an product by id
 * @access Private(admin)
 */
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      reviews,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      dimensions,
      weight,
    } = req.body;
    const { id } = req.params;

    console.log("image", images)

    const product = await Product.findById(id);

    if (!product) {
      throw new ApiError(404, "Product not found!");
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discountPrice = discountPrice || product.discountPrice;
    product.countInStock = countInStock || product.countInStock;
    product.sku = sku || product.sku;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.sizes = sizes || product.sizes;
    product.colors = colors || product.colors;
    product.collections = collections || product.collections;
    product.material = material || product.material;
    product.gender = gender || product.gender;
    product.images = images || product.images;
    product.isFeatured = isFeatured || product.isFeatured;
    if (typeof isPublished !== "undefined") {
      product.isPublished = isPublished;
    }
    product.rating = rating || product.rating;
    product.reviews = reviews || product.reviews;
    product.tags = tags || product.tags;
    product.metaTitle = metaTitle || product.metaTitle;
    product.metaDescription = metaDescription || product.metaDescription;
    product.metaKeywords = metaKeywords || product.metaKeywords;
    product.dimensions = dimensions || product.dimensions;
    product.weight = weight || product.weight;

    const updatedProduct = await product.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Product updated successfully", updatedProduct)
      );
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route DELETE /api/products/:id
 * @desc Delete an product by id
 * @access Private(admin)
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    return res
      .status(200)
      .json(
        new ApiResponse(200, `Product deleted successfully with id: ${id}`)
      );
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route GET /api/products
 * @desc Gel all products by optional query and filter
 * @access Public
 */
export const getProducts = async (req, res) => {
  try {
    const {
      collection,
      category,
      gender,
      color,
      size,
      material,
      brand,
      minPrice,
      maxPrice,
      sortBy,
      search,
      page,
      limit,
    } = req.query;

    console.log(brand)

    let querys = {};
    let sort;

    if (collection && collection.toLowerCase() !== "all")
      querys.collection = collection;
    if (category && category.toLowerCase() !== "all")
      querys.category = category;

    if (material) querys.material = { $in: material.split(",") };
    if (brand) querys.brand = { $in: brand.split(",") };
    if (size) querys.sizes = { $in: size.split(",") };
    if (color) querys.colors = { $in: [color] };
    if (gender) querys.gender = gender;

    console.log(querys)

    if (minPrice || maxPrice) {
      querys.discountPrice = {};
      if (minPrice) querys.discountPrice.$gte = Number(minPrice);
      if (maxPrice) querys.discountPrice.$lte = Number(maxPrice);
    }

    if (search) {
      querys.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 12;
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments({ ...querys, isPublished: true });
    const products = await Product.find({ ...querys, isPublished: true })
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    return res.status(200).json(
      new ApiResponse(200, "Products fetched successfully", {
        products,
        pagination: {
          totalItems: total,
          totalPages: Math.ceil(total / limitNum),
          currentPage: pageNum,
          limit: limitNum,
        },
      })
    );
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route GET /api/products/:id
 * @desc Get an product by id
 * @access Public
 */
export const getProductByID = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      throw new ApiError(404, "Product not found!");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Product founded successfully", product));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route GET /api/products/similar/:id
 * @desc Get similar products by base on the curr product gender & category
 * @access Public
 */
export const getSimilarProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const currProduct = await Product.findById(id);

    if (!currProduct) {
      throw new ApiError(404, "Product not found!");
    }

    const similarProducts = await Product.find({
      _id: { $ne: id },
      gender: currProduct.gender,
      category: currProduct.category,
      isPublished: true,
    }).limit(4);

    return res
      .status(200)
      .json(new ApiResponse(200, "Similar products founded", similarProducts));
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route GET /api/products/best-seller
 * @desc Get height rating products
 * @access Public
 */
export const getBestSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({
      rating: { $gt: 4.5 },
      isPublished: true,
    }).limit(8);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Best seller products fetched successfully",
          products
        )
      );
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};

/**
 * @route GET /api/products/new-arrivals
 * @desc Get lates uploaded products
 * @access Public
 */
export const getNewArrivalProducts = async (req, res) => {
  try {
    const products = await Product.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(10);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "New arrival products fetched successfully",
          products
        )
      );
  } catch (error) {
    throw new ApiError(500, error.message, error);
  }
};
