"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignupPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSigup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      if (res.data) {
        console.log(res.data);
      }
      router.push("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh]">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <form onSubmit={handleSigup} className="flex flex-col gap-5 mt-5">
        <span className="flex flex-col gap-1">
          <label className="text-sm text-gray-200" htmlFor="fullName">
            Full Name
          </label>
          <input
            className="outline-none border-none px-2 py-1 rounded-md text-black"
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          />
        </span>

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
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </span>

        <button className="w-full bg-blue-600 p-1 rounded-md mt-3">
          Sign Up
        </button>
      </form>

      <Link href={"/login"} className="text-blue-500 underline text-sm mt-4">
        Visit Login Page
      </Link>

      {/* loading state */}
      <div className="mt-3 text-orange-500">
        {loading ? "Processing..." : null}
      </div>
    </div>
  );
};

export default SignupPage;
