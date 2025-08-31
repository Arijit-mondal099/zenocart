import { ArrowDownUp } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const SortOption = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center gap-1 border border-gray-600 px-2 rounded-lg bg-gray-800 hover:scale-95 transition-all duration-300 cursor-pointer">
      <ArrowDownUp className="w-4 h-4 text-white" />

      <select
        className="focus:outline-none text-sm text-white bg-gray-800 font-medium w-full p-2 rounded-lg cursor-pointer"
        id="sort"
        value={searchParams.get("sortBy") || "default"}
        onChange={handleSortChange}
      >
        <option value="default">Default</option>
        <option value="priceAsc">Low to High</option>
        <option value="priceDesc">High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOption;
