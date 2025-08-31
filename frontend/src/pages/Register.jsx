import { Loader, ShoppingCart } from "lucide-react";
import { register } from "../assets";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { registerUser } from "../features/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then(() => toast.success("Account created successfully"))
      .catch(() => toast.error("Invalid cradential!"));

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col md:flex-row rounded-lg overflow-hidden border border-gray-800">
      {/* Left container */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-900">
        <div className="flex flex-col items-center justify-center gap-6 w-full max-w-sm p-8">
          <div className="flex items-center justify-center gap-2 group">
            <span className="bg-white p-2 rounded-lg group-hover:scale-105 transition-all animate-bounce">
              <ShoppingCart className="h-8 w-8 text-black" />
            </span>
          </div>

          {/* Welcome Text */}
          <div className="text-center">
            <p className="text-2xl font-semibold text-white">
              Create Your Account
            </p>
            <p className="text-sm text-gray-400">
              Enter your full name, email and password to register.
            </p>
          </div>

          {/* Login Form */}
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-400">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:border-gray-200 text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400">Email</label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:border-gray-200 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:border-gray-200 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-2 rounded-md text-sm hover:scale-95 transition-all duration-300 cursor-pointer"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader className="text-black animate-spin h-4 w-4 " />
                  Registering...
                </div>
              ) : (
                "Register"
              )}
            </button>

            <p className="text-sm text-center text-gray-400">
              Alredy have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 font-semibold underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right image */}
      <div className="w-full md:w-1/2">
        <img
          src={register}
          alt="login image"
          className="w-full h-200 object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
