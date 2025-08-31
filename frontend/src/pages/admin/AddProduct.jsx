import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { createProduct } from "../../features/adminSlice";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    countInStock: "",
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
    isFeatured: false,
    isPublished: false,
    rating: "",
    numReviews: "",
    tags: [],
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
    dimensions: [],
    weight: "",
  });
  const [isImageUploading, setIsImageUploading] = useState(false);
  const { loading } = useSelector((store) => store.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, { url: previewUrl }],
    }));

    try {
      const formData = new FormData();
      formData.append("image", file);

      setIsImageUploading(true);
      const { data } = await axiosInstance.post("/api/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsImageUploading(false);

      setProduct((prev) => ({
        ...prev,
        images: [
          ...prev.images.filter((img) => img?.url !== previewUrl),
          data.value,
        ],
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
      setProduct((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img.url !== previewUrl),
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => {
      if (type === "checkbox") {
        return { ...prev, [name]: checked };
      }
      if (
        name === "sizes" ||
        name === "colors" ||
        name === "dimensions" ||
        name === "tags" ||
        name === "metaKeywords"
      ) {
        return { ...prev, [name]: value.split(",").map((item) => item.trim()) };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(product))
      .unwrap()
      .then(() => toast.success("Product added successfully"))
      .catch(() => toast.error("Something went wrong"))
  };

  return (
    <div className="space-y-6 pb-10">
      <div
        className="flex items-center text-gray-400 cursor-pointer"
        onClick={() => navigate("/admin")}
      >
        <ChevronLeft />
        Back to dashboard
      </div>

      <h2 className="text-white text-3xl md:text-4xl font-bold pb-5">
        Add New Product
      </h2>

      <div className="space-y-4 p-4 border border-gray-800 bg-gray-900 rounded-lg">
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={product.name || ""}
              placeholder="Product Name"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={product.description || ""}
              onChange={handleChange}
              placeholder="Product Description"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            ></textarea>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={product.price ?? ""}
              onChange={handleChange}
              placeholder="Product Price"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Discount Price
            </label>
            <input
              type="number"
              name="discountPrice"
              value={product.discountPrice ?? ""}
              onChange={handleChange}
              placeholder="Product Discount Price"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Count in Stock
            </label>
            <input
              type="number"
              name="countInStock"
              onChange={handleChange}
              value={product.countInStock ?? ""}
              placeholder="100"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">SKU</label>
            <input
              type="text"
              name="sku"
              value={product.sku || ""}
              onChange={handleChange}
              placeholder="Product SKU"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={product.category || ""}
              onChange={handleChange}
              placeholder="Product Category"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">Brand</label>
            <input
              type="text"
              name="brand"
              value={product.brand || ""}
              onChange={handleChange}
              placeholder="Product Brand"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Sizes (comma-separated)
            </label>
            <input
              type="text"
              name="sizes"
              value={product.sizes.join(", ") || ""}
              onChange={handleChange}
              placeholder="S, M, Xl, XXl"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Colors (comma-separated)
            </label>
            <input
              type="text"
              name="colors"
              value={product.colors.join(", ") || ""}
              onChange={handleChange}
              placeholder="white, black, blue"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Collections
            </label>
            <input
              type="text"
              name="collections"
              value={product.collections || ""}
              onChange={handleChange}
              placeholder="Product Collections"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Material
            </label>
            <input
              type="text"
              name="material"
              value={product.material || ""}
              onChange={handleChange}
              placeholder="Product Material"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">Gender</label>
            <select
              name="gender"
              value={product.gender || ""}
              onChange={handleChange}
              className="border border-gray-600 bg-gray-900 text-white p-2 rounded-lg focus:outline-gray-600 focus:ring-1 focus:ring-gray-600"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">Rating</label>
            <input
              type="number"
              name="rating"
              value={product.rating ?? ""}
              onChange={handleChange}
              placeholder="4.5"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Num Reviews
            </label>
            <input
              type="number"
              name="numReviews"
              value={product.numReviews ?? ""}
              onChange={handleChange}
              placeholder="12000"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={product.tags.join(", ") || ""}
              onChange={handleChange}
              placeholder="Product Tags"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Meta Title
            </label>
            <input
              type="text"
              name="metaTitle"
              value={product.metaTitle}
              onChange={handleChange}
              placeholder="Product Meta Title"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Meta Description
            </label>
            <input
              type="text"
              name="metaDescription"
              value={product.metaDescription}
              onChange={handleChange}
              placeholder="Product Meta Description"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Meta Keywords (comma-separated)
            </label>
            <input
              type="text"
              name="metaKeywords"
              value={product.metaKeywords.join(", ") || ""}
              onChange={handleChange}
              placeholder="Prodcut Meta Keywords"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Dimensions (length, width, height)
            </label>
            <input
              type="text"
              name="dimensions"
              value={product.dimensions?.join(", ") || ""}
              onChange={handleChange}
              placeholder="1m, 1m, 2m"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">Weight</label>
            <input
              type="number"
              name="weight"
              value={product.weight}
              onChange={handleChange}
              placeholder="1kg"
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex items-center gap-2 py-2">
            <label className="text-lg text-gray-400 font-medium">
              Featured
            </label>
            <label className="relative inline items-center cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={!!product.isFeatured}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center gap-2 py-2">
            <label className="text-lg text-gray-400 font-medium">
              Published
            </label>
            <label className="relative inline items-center cursor-pointer">
              <input
                type="checkbox"
                name="isPublished"
                checked={!!product.isPublished}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-gray-500">Upload Images</p>

            <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-200 transition duration-300">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, JPEG, WEBP (max 5MB)
                </p>
              </div>

              <input
                type="file"
                className="hidden"
                multiple
                onChange={handleAddImage}
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {product?.images.map((image, index) => (
              <img
                src={image?.url || image}
                alt="product-image"
                key={index}
                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
              />
            ))}
          </div>
          {isImageUploading && (
            <p className="text-sm text-white animate-pulse font-medium">
              Image Uploading...
            </p>
          )}

          <button
            type="submit"
            className="px-2 py-3 rounded-lg text-white font-semibold text-sm bg-green-600 w-full mt-8 hover:scale-90 transition-all duration-300 cursor-pointer"
          >
            {loading ? "Adding..." : "Add New Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
