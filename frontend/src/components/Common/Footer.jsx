import { Facebook, Instagram, PhoneCall, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full px-2 sm:px-8 md:px-16 lg:px-24 pt-10 bg-gray-900 border-t border-gray-800 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-4 pb-5">
        <div className="flex flex-col items-center sm:items-start gap-4">
          <h4 className="text-lg font-bold text-white">News letter</h4>
          <p className="text-sm text-gray-400 max-w-70">
            Be the first to hear about new products, exclusive ebents, and
            online offers.
          </p>
          <p className="text-sm text-gray-200 font-bold">
            Sign up and get 10% off your first order.
          </p>

          <form className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-500 px-2 py-3 rounded-lg border-r-0 rounded-r-none outline-none text-white"
            />
            <button
              type="submit"
              className="bg-white font-semibold rounded-lg px-2 py-3 text-black rounded-l-none border border-gray-400"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="flex items-center sm:items-start gap-4 flex-col">
          <h4 className="text-lg font-bold text-white">Shop</h4>

          <div className="flex items-center sm:items-start gap-2 flex-col">
            <Link
              to={"/collections/all?gender=men&category=top wear"}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm text-gray-200 font-medium hover:underline"
            >
              Men's Top Wear
            </Link>
            <Link
              to={"/collections/all?gender=women&category=top wear"}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm text-gray-200 font-medium hover:underline"
            >
              Women's Top Wear
            </Link>
            <Link
              to={"/collections/all?gender=men&category=bottom wear"}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm text-gray-200 font-medium hover:underline"
            >
              Men's Bottom Wear
            </Link>
            <Link
              to={"/collections/all?gender=women&category=bottom wear"}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm text-gray-200 font-medium hover:underline"
            >
              Women's Bottom Wear
            </Link>
          </div>
        </div>

        <div className="flex items-center sm:items-start gap-4 flex-col">
          <h4 className="text-lg font-bold text-white">Support</h4>

          <div className="flex items-center sm:items-start gap-2 flex-col">
            <Link className="text-sm font-medium text-gray-200 hover:underline">
              Contact Us
            </Link>
            <Link className="text-sm font-medium text-gray-200 hover:underline">
              About Us
            </Link>
            <Link className="text-sm font-medium text-gray-200 hover:underline">
              FAQs
            </Link>
            <Link className="text-sm font-medium text-gray-200 hover:underline">
              Features
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-start gap-4 text-gray-200">
          <h4 className="text-lg font-bold text-white">Follow Us</h4>

          <div className="flex items-center sm:items-start gap-2">
            <div className="p-2 border border-gray-500 rounded-full cursor-pointer">
              <Facebook className="w-6 h-6  transition-colors" />
            </div>
            <div className="p-2 border border-gray-500 rounded-full cursor-pointer">
              <Instagram className="w-6 h-6  transition-colors" />
            </div>
            <div className="p-2 border border-gray-500 rounded-full cursor-pointer">
              <Twitter className="w-6 h-6  transition-colors" />
            </div>
          </div>

          <div className="flex items-center sm:items-start flex-col gap-2">
            <span className="text-lg font-bold">Call Us</span>
            <span className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              0123-456-789
            </span>
          </div>
        </div>
      </div>

      <div className="text-center py-5 border-t border-gray-800 text-sm text-gray-500">
        © 2025 ZenoCart by Arijit Mondal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
