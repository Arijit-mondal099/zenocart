import {
  ChevronLeft,
  CirclePlus,
  ListMinus,
  Loader,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../features/adminSlice";
import { toast } from "react-hot-toast";

const UsersManagement = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const { users, loading } = useSelector((store) => store.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    if (user.password.length < 6) {
      toast.error("Password length mast be 6!");
      return;
    }

    dispatch(createUser(user))
      .unwrap()
      .then(() => toast.success("User ceated successfully"))
      .catch(() => toast.error("Something went wrong, try anain!"));

    setUser({ name: "", password: "", email: "", role: "" });
  };

  const handleChangeUserRole = (e, userId) => {
    dispatch(updateUser({ userId, userData: { role: e.target.value }}))
      .unwrap()
      .then(() => toast.success("User role updated successfully"))
      .catch(() => toast.error("Something went wrong!"));
  };

  const handleDeleteUser = (userId) => {
    const isDelete = window.confirm(
      "Are you sure, you want to delete this user?"
    );

    if (isDelete) {
      dispatch(deleteUser(userId));
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
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
          User Management
        </p>

        <div className="border border-gray-800 bg-gray-900 rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-2 text-white mb-6">
            <CirclePlus className="h-6 w-6" />
            <p className="text-lg font-bold">Add New User</p>
          </div>

          <form className="space-y-2" onSubmit={handleAddUser}>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 font-medium">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter user name"
                className="border border-gray-600 rounded-lg px-2 py-2 text-white bg-gray-800"
                value={user.name}
                onChange={handleOnChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter user email id"
                className="border border-gray-600 rounded-lg px-2 py-2 text-white bg-gray-800"
                value={user.email}
                onChange={handleOnChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter user password"
                className="border border-gray-600 rounded-lg px-2 py-2 text-white bg-gray-800"
                value={user.password}
                onChange={handleOnChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 font-medium">Role</label>
              <select
                name="role"
                className="border border-gray-600 rounded-lg px-2 py-2 text-white bg-gray-800"
                value={user.role}
                onChange={handleOnChange}
              >
                <option value="">Select role</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-sm text-white font-semibold w-40 py-2 rounded-lg hover:scale-95 transition-all duration-300 cursor-pointer mt-6 flex items-center justify-center"
            >
              {loading ? (
                <div className="flex items-center gap-1">
                  <Loader className="h-5 w-5 animate-spin" />{" "}
                  <span>Createing...</span>
                </div>
              ) : (
                "Add User"
              )}
            </button>
          </form>
        </div>

        <div className="border border-gray-800 bg-gray-900 rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-2 text-white mb-6">
            <ListMinus className="h-6 w-6" />
            <p className="text-lg font-bold">Users List</p>
          </div>

          <div className="overflow-x-auto">
            <div className="space-y-1 min-w-2xl md:w-full">
              <div className="grid grid-cols-4 text-sm font-semibold text-gray-200 bg-gray-800 px-2 py-4 rounded-md">
                <p>NAME</p>
                <p>EMAIL</p>
                <p>ROLE</p>
                <p>ACTION</p>
              </div>

              {users.map(({ _id, email, name, role }) => (
                <div
                  key={_id}
                  className="grid grid-cols-4 items-center gap-2 text-sm font-semibold text-gray-200 odd:bg-gray-800 p-2 rounded-md hover:bg-gray-700 transition-all duration-200"
                >
                  <p>{name}</p>
                  <p>{email}</p>

                  <div>
                    <select
                      name="role"
                      className="border border-gray-600 bg-gray-800 rounded-lg px-2 py-2 focus:outline-none"
                      value={role}
                      onChange={(e) => handleChangeUserRole(e, _id)}
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <button
                    className="text-red-600 border border-red-600 bg-gray-800 w-25 flex items-center justify-center gap-1 px-2 py-2 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300"
                    onClick={() => handleDeleteUser(_id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-semibold">Delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
