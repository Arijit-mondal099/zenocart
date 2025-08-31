import { ChevronLeft, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById, updateProduct } from "../../features/adminSlice";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";

const EditProductPage = () => {
  const [editProduct, setEditProduct] = useState(null);
  const { loading } = useSelector((store) => store.admin);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEditProduct((prev) => {
      if (type === "checkbox") {
        return { ...prev, [name]: checked };
      }
      if (name === "sizes" || name === "colors") {
        return { ...prev, [name]: value.split(",").map((item) => item.trim()) };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleAddImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setEditProduct((prev) => ({
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

      setEditProduct((prev) => ({
        ...prev,
        images: [
          ...prev.images.filter((img) => img?.url !== previewUrl),
          data.value,
        ],
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
      setEditProduct((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img.url !== previewUrl),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({ productId: editProduct._id, productData: editProduct })
    )
      .unwrap()
      .then(() => toast.success("Product updated"))
      .catch(() => toast.error("Something went wrong!"));
  };

  useEffect(() => {
    dispatch(fetchProductById(id))
      .unwrap()
      .then((val) => setEditProduct(val));
  }, [id, dispatch]);

  return (
    <div className="space-y-6 pb-10">
      <div
        className="flex items-center text-gray-400 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft />
        Back
      </div>

      <div className="space-y-4 p-4 border border-gray-800 bg-gray-900 rounded-lg">
        <div className="flex items-center gap-2 text-white mb-6">
          <Pencil />
          <p className="text-2xl font-bold">Edit Product</p>
        </div>

        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={editProduct?.name || ""}
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={editProduct?.description || ""}
              onChange={handleChange}
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            ></textarea>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={editProduct?.price ?? ""}
              onChange={handleChange}
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
              value={editProduct?.discountPrice ?? ""}
              onChange={handleChange}
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
              value={editProduct?.countInStock ?? ""}
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">SKU</label>
            <input
              type="text"
              name="sku"
              value={editProduct?.sku || ""}
              onChange={handleChange}
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">Brand</label>
            <input
              type="text"
              name="brand"
              value={editProduct?.brand || ""}
              onChange={handleChange}
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
              value={editProduct?.category || ""}
              onChange={handleChange}
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
              value={editProduct?.collections || ""}
              onChange={handleChange}
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
              value={editProduct?.material || ""}
              onChange={handleChange}
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">Rating</label>
            <input
              type="number"
              name="rating"
              value={editProduct?.rating ?? ""}
              onChange={handleChange}
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
              value={editProduct?.numReviews ?? ""}
              onChange={handleChange}
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
              value={editProduct?.sizes?.join(", ") || ""}
              onChange={handleChange}
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
              value={editProduct?.colors?.join(", ") || ""}
              onChange={handleChange}
              className="border border-gray-600 text-white p-2 rounded-lg focus:outline-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-medium">Gender</label>
            <select
              name="gender"
              value={editProduct?.gender || ""}
              onChange={handleChange}
              className="border border-gray-600 bg-gray-800 text-white p-2 rounded-lg focus:outline-gray-600 focus:ring-1 focus:ring-gray-600"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="flex items-center gap-2 py-6">
            <label className="text-lg text-gray-400 font-medium">
              Published
            </label>
            <label className="relative inline items-center cursor-pointer">
              <input
                type="checkbox"
                name="isPublished"
                checked={!!editProduct?.isPublished}
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
            {editProduct?.images.map((image, index) => (
              <img
                src={image?.url || image}
                alt="product-image"
                key={index}
                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
              />
            ))}
          </div>
          {isImageUploading && <p className="text-sm text-white animate-pulse font-medium">Image Uploading...</p>}

          <button
            type="submit"
            className="px-2 py-3 rounded-lg text-white font-semibold text-sm bg-green-600 w-full mt-8 hover:scale-90 transition-all duration-300 cursor-pointer"
          >
            {loading ? "Updateing..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
