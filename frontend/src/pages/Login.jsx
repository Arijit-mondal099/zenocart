import { login } from "../assets";
import { Loader, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice.js";
import { toast } from "react-hot-toast";
import { mergeGuestCartWithUser } from "../features/cartSlice.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, guestId } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = Object.fromEntries([...searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Login successfully");

        // merge guest user cart with loggedin user cart
        dispatch(mergeGuestCartWithUser(guestId))
          .unwrap()
          .then (() => {
            if (params?.redirect) navigate("/cart");
            else navigate("/");
          })
          .catch((error) => {
            console.log(error)
          });
      })
      .catch(() => {
        toast.error("Invalid email or password!")
      });

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
            <p className="text-2xl font-semibold text-white">Welcome Back!</p>
            <p className="text-sm text-gray-400">
              Enter your email and password to login.
            </p>
          </div>

          {/* Login Form */}
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-400">Email</label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md text-sm focus:outline-none focus:ring focus:border-gray-200 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md text-sm focus:outline-none focus:ring focus:border-gray-200 text-white"
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
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-sm text-center text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 font-semibold underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right image */}
      <div className="w-full md:w-1/2">
        <img
          src={login}
          alt="login image"
          className="w-full h-200 object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
