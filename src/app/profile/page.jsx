"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProfilePage = () => {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      if (res?.data) {
        console.log(res.data);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");
      if (res?.data) {
        console.log(res.data);
        setUser(res?.data?.data);
      }
      console.log(user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] flex flex-col justify-center items-center">
      <h1>Profile Page</h1>

      {loading ? (
        <h1 className="mt-3 text-orange-500">Loading....</h1>
      ) : (
        <div>
          <ul className="mt-3 flex flex-col gap-2 text-pink-400">
            <li>Name: {user.fullName}</li>
            <li>Email: {user.email}</li>
            <li>User Id: {user._id}</li>
          </ul>
        </div>
      )}

      {/* logout button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 mt-4 rounded-lg"
      >
        Logout
      </button>

      {/* get user details button */}
      <button
        onClick={getUserDetails}
        className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 mt-4 rounded-lg"
      >
        Get User Details
      </button>
    </div>
  );
};

export default ProfilePage;
