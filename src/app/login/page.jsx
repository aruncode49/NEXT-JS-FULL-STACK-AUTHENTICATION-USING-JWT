"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      if (res?.data) {
        console.log(res?.data);
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh]">
      <h1 className="text-3xl font-bold">Login</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-5 mt-5"
        action=""
      >
        <span className="flex flex-col gap-1">
          <label className="text-sm text-gray-200" htmlFor="email">
            Email
          </label>
          <input
            className="outline-none border-none px-2 py-1 rounded-md text-black"
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </span>

        <span className="flex flex-col gap-1">
          <label className="text-sm text-gray-200" htmlFor="password">
            Password
          </label>
          <input
            className="outline-none border-none px-2 py-1 rounded-md text-black"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </span>

        <button className="w-full bg-green-600 p-1 rounded-md mt-3">
          Login
        </button>
      </form>

      <Link href={"/signup"} className="text-blue-500 underline text-sm mt-4">
        Visit Signup Page
      </Link>

      {/* loading state */}
      <div className="mt-3 text-orange-500">
        {loading ? "Processing..." : null}
      </div>
    </div>
  );
};

export default LoginPage;
