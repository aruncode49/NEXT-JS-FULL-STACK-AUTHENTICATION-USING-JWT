"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();

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

  return (
    <div className="min-h-[100vh] flex flex-col justify-center items-center">
      <h1>Profile Page</h1>
      <p>This is a user profile page</p>

      {/* logout button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 mt-4 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
