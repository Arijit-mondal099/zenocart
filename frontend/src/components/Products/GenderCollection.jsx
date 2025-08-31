import { Link } from "react-router-dom";
import { mensCollection, womensCollection } from "../../assets";

const GenderCollection = () => {
  return (
    <div className="pt-25 flex flex-col items-center">
      <h1 className="text-2xl md:text-4xl tracking-tight text-white font-bold mb-10">
        Men & Women Collection's
      </h1>

      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="relative group overflow-hidden rounded-lg">
          <img
            src={womensCollection}
            alt="womensCollection"
            className="w-lg h-[500px] md:h-[700px] object-cover group-hover:scale-105 transition-all duration-300"
          />

          <div className="absolute z-10 bottom-8 left-8 bg-white/80 px-8 py-4 rounded-lg flex items-start gap-2 flex-col">
            <h2 className="text-lg font-bold text-gray-700">
              Women's Collection
            </h2>
            <Link
              to={"/collections/all?gender=women"}
              className="text-blue-500 text-sm font-medium underline"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-lg">
          <img
            src={mensCollection}
            alt="mensCollection"
            className="w-lg h-[500px] md:h-[700px] object-cover group-hover:scale-105 transition-all duration-300"
          />

          <div className="absolute z-10 bottom-8 left-8 bg-white/80 px-8 py-4 rounded-lg flex items-start gap-2 flex-col">
            <h2 className="text-lg font-bold text-gray-700">
              Men's Collection
            </h2>
            <Link
              to={"/collections/all?gender=men"}
              className="text-blue-500 text-sm font-medium underline"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderCollection;
