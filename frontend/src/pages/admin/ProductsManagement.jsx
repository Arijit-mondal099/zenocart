import { ChevronLeft, Edit, ListMinus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../features/adminSlice";

const ProductsManagement = () => {
  const { products, loading } = useSelector((store) => store.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="space-y-6 pb-10">
      <div
        className="flex items-center text-gray-400 cursor-pointer"
        onClick={() => navigate("/admin")}
      >
        <ChevronLeft />
        Back to dashboard
      </div>

      <div className="space-y-4">
        <p className="text-3xl md:text-4xl font-bold text-white pb-6">
          Products Management
        </p>

        <div className="overflow-x-auto">
          <div className="space-y-1 min-w-4xl md:w-full p-4 border border-gray-800 bg-gray-900 rounded-lg">
            <div className="flex items-center gap-2 text-white mb-6">
              <ListMinus />
              <p className="text-lg font-bold">Products List</p>
            </div>

            <div className="grid grid-cols-4 items-center gap-2 bg-gray-800 px-2 py-4 rounded-md text-sm font-bold text-gray-200">
              <div>NAME</div>
              <div>PRICE</div>
              <div>SKU</div>
              <div>ACTION</div>
            </div>

            {loading ? (
              <>
                <div className="col-span-5 w-full h-12 bg-gray-400 animate-pulse rounded-lg mb-4" />
                <div className="col-span-5 w-full h-12 bg-gray-400 animate-pulse rounded-lg mb-4" />
                <div className="col-span-5 w-full h-12 bg-gray-400 animate-pulse rounded-lg mb-4" />
                <div className="col-span-5 w-full h-12 bg-gray-400 animate-pulse rounded-lg mb-4" />
                <div className="col-span-5 w-full h-12 bg-gray-400 animate-pulse rounded-lg mb-4" />
              </>
            ) : (
              products?.map(({ _id, name, price, sku }) => (
                <div
                  key={_id}
                  className="grid grid-cols-4 items-center gap-2 text-sm text-gray-200 even:bg-gray-800 p-2 rounded-md hover:bg-gray-700 transition-all duration-200"
                >
                  <div className="capitalize">{name}</div>
                  <div>₹{price}</div>
                  <div className="uppercase">{sku}</div>
                  <div className="flex gap-2 items-center">
                    <span className="p-2 bg-green-600 text-white rounded-full cursor-pointer group">
                      <Edit
                        onClick={() => navigate(`/admin/products/${_id}`)}
                        className="w-4 h-4 hover:scale-125 transition-all duration-300"
                      />
                    </span>
                    <span className="p-2 bg-red-600 text-white rounded-full cursor-pointer group">
                      <Trash2 className="w-4 h-4 hover:scale-125 transition-all duration-300" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsManagement;
