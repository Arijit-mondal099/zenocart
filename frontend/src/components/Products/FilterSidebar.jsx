import { Funnel } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { categorys, brands, colors, genders, materials, sizes } from "../../lib/constant";

const FilterSidebar = ({ onClose }) => {
  const [filters, setFilters] = useState({ category: "", gender: "", color: "", size: [], material: [], brand: [], minPrice: 10, maxPrice: 1000 });
  const [priceRange, setPriceRange] = useState([10, 1000]);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newFilters = { ...filters };

    if ( type === "checkbox" ) {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name]?.filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    const newFilters = { ...filters, minPrice: 10, maxPrice: newPrice };

    setPriceRange([10, newPrice]);
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (filters) => {
    const params = new URLSearchParams();

    Object.keys(filters).forEach((key) => {
      if ( Array.isArray(filters[key]) && filters[key]?.length > 0 ) {
        params.set(key, filters[key].join(",")); // size=m,l,xl
      } else if (filters[key]) {
        params.set(key, filters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params?.category || "",
      gender: params?.gender || "",
      color: params?.color || "",
      size: params?.size ? params.size?.split(",") : [],
      material: params?.material ? params.material?.split(",") : [],
      brand: params?.brand ? params.brand?.split(",") : [],
      minPrice: params?.minPrice || 10,
      maxPrice: params?.maxPrice || 1000,
    });

    setPriceRange([10, params.maxPrice || 1000]);
  }, [searchParams]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  return (
    <div className="lg:hidden fixed inset-0 z-40 mt-15.5">
      {/* backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm mt-16"
        onClick={onClose}
      />

      {/* sidebar panel */}
      <div
        className="absolute top-0 left-0 w-64 h-full backdrop-blur-md border-r border-gray-800 shadow-lg z-50 p-4 flex flex-col space-y-4 overflow-y-auto py-4 bg-gray-900"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <div className="flex items-center gap-1 font-bold text-white">
          <Funnel className="w-4 h-4" />
          Filter
        </div>

        {/* category filter */}
        <div className="space-y-2 text-white">
          <p className="text-sm font-medium ">Category</p>

          <div>
            {categorys.map((category, index) => (
              <label
                htmlFor={`category-${index}`}
                key={index}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  id={`category-${index}`}
                  value={category}
                  onChange={handleFilterChange}
                  checked={filters.category === category}
                />
                <p className="text-sm capitalize">{category}</p>
              </label>
            ))}
          </div>
        </div>

        {/* gender filter */}
        <div className="space-y-2 text-white">
          <p className="text-sm font-medium ">Gender</p>

          <div>
            {genders.map((gender, index) => (
              <label
                htmlFor={`gender-${index}`}
                key={index}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="gender"
                  id={`gender-${index}`}
                  value={gender}
                  onChange={handleFilterChange}
                  checked={filters.gender === gender}
                />

                <p className="text-sm capitalize">{gender}</p>
              </label>
            ))}
          </div>
        </div>

        {/* color filter */}
        <div className="space-y-2 text-white">
          <p className="text-sm font-medium ">Color</p>

          <div className="flex items-center gap-2 flex-wrap">
            {colors.map((color) => (
              <button
                key={color}
                className={`h-7 w-7 rounded-full border-2 cursor-pointer 
                  ${color === filters.color ? "border-gray-200" : "border-gray-600"}
                `}
                style={{ backgroundColor: color }}
                name="color"
                value={color}
                onClick={handleFilterChange}
              />
            ))}
          </div>
        </div>

        {/* size filter */}
        <div className="space-y-1 text-white">
          <p className="text-sm font-medium ">Size</p>

          {sizes.map((size) => (
            <div className="flex items-center gap-2" key={size}>
              <input
                type="checkbox"
                id={size}
                name="size"
                value={size}
                onChange={handleFilterChange}
                checked={filters.size.includes(size)}
              />
              <label htmlFor={size} className="text-sm  uppercase cursor-pointer">{size}</label>
            </div>
          ))}
        </div>

        {/* material filter */}
        <div className="space-y-1 text-white">
          <p className="text-sm font-medium ">Material</p>

          {materials.map((material) => (
            <div className="flex items-center gap-2" key={material}>
              <input 
                type="checkbox"
                id={material} 
                name="material" 
                value={material}
                onChange={handleFilterChange}
                checked={filters.material.includes(material)}
              />
              <label htmlFor={material} className="text-sm capitalize cursor-pointer">{material}</label>
            </div>
          ))}
        </div>

        {/* brand filter */}
        <div className="space-y-1 text-white">
          <p className="text-sm font-medium ">Brand</p>

          {brands.map((brand) => (
            <div className="flex items-center gap-2" key={brand}>
              <input 
                type="checkbox" 
                name="brand" 
                id={brand}
                value={brand}
                onChange={handleFilterChange}
                checked={filters.brand.includes(brand)}
              />
              <label htmlFor={brand} className="text-sm  capitalize cursor-pointer">{brand}</label>
            </div>
          ))}
        </div>

        {/* price range filter */}
        <div className="flex flex-col items-start gap-1 pr-2 text-white">
          <p className="text-sm font-medium ">Price Range</p>

          <input
            type="range"
            name="priceRange"
            min={10}
            max={1000}
            className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            value={priceRange[1]}
            onChange={handlePriceChange}
          />

          <div className="flex text-xs font-medium  justify-between items-center w-full mt-1">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
