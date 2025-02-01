"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

interface User {
  username: string;
  email: string;
  password: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signup successful");
      router.push("/login");
    } catch (error: any) {
      console.error("Signup failed", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.username && user.email && user.password));
  }, [user]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center py-6 px-4"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/paper-style-white-monochrome-background_23-2149001605.jpg?semt=ais_hybrid")',
      }}
    >
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-transparent bg-opacity-90">
        <h1 className="text-3xl font-semibold text-center mb-6">
          {loading ? "Processing..." : "Signup"}
        </h1>
        <hr className="mb-6" />
        <form className="space-y-4" onSubmit={onSignup}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your username"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={buttonDisabled || loading}
              className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-200 ${
                buttonDisabled || loading
                  ? "bg-slate-800"
                  : "bg-slate-800 hover:bg-slate-900"
              }`}
            >
              {loading ? "Processing..." : "Signup"}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-slate-800 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
