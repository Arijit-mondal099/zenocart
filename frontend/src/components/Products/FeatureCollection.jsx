import { useNavigate } from "react-router-dom";
import { featured } from "../../assets";

const FeatureCollection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/collections/all");
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 my-20 rounded-lg overflow-hidden border border-gray-800">
      {/* Left Content */}
      <div className="flex flex-col justify-center p-6 md:p-10 gap-4 bg-gray-900">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          Comfort and Style
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-white w-full lg:w-md">
          Apparel made for your everyday life
        </h2>
        <p className="text-gray-400 text-sm md:text-base w-full lg:pr-20">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          molestias velit numquam explicabo neque, eveniet impedit tenetur
          assumenda soluta maxime?
        </p>
        <button 
          className="w-fit px-6 py-2 bg-white text-black rounded-md hover:scale-95 font-bold transition-all duration-300 cursor-pointer"
          onClick={handleClick}
        >
          Shop Now
        </button>
      </div>

      {/* Right Image */}
      <div className="h-120 flex items-center justify-center">
        <img
          src={featured}
          alt="featured image"
          className="h-full w-full object-cover object-top"
        />
      </div>
    </div>
  );
};

export default FeatureCollection;
