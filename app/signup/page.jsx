"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { NEXT_PUBLIC_BASE_API_URL as BASE_API_URL } from "@/app/(utils)/constants";

const Signup = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateUsername = (username) => /^[a-z]/.test(username);
  const validateEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!validateUsername(username)) {
      setError("Username must contain only lowercase letters");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (password?.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_API_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.status === 409) {
        setError("Username or Email already exists");
      } else if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Something went wrong! Try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  if (sessionStatus === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="spinner"></span>
      </div>
    );
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex flex-col min-h-screen items-center justify-center p-4">
        <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 w-96 p-8 rounded-2xl shadow-lg">
          <h1 className="text-4xl text-center font-semibold text-white">
            SIGNUP
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                className="w-full h-10 p-2 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-blue-500"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                required
              />
              <small className="text-red-500">
                {error && error.includes("Username") && error}
              </small>
            </div>
            <div className="mb-4">
              <input
                className="w-full h-10 p-2 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-blue-500"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
              />
              <small className="text-red-500">
                {error && error.includes("Email") && error}
              </small>
            </div>
            <div className="mb-4">
              <input
                className="w-full h-10 p-2 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-blue-500"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
              />
              <small className="text-red-500">
                {error && error.includes("Password") && error}
              </small>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 mb-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "SIGNUP"
              )}
            </button>
            {error && <p className="text-red-500 text-center mb-2">{error}</p>}
          </form>
          <div className="text-center my-4 text-white">
            <span>- OR -</span>
          </div>
          <Link
            className="block text-center text-blue-500 font-semibold hover:underline"
            href="/login">
            Login with an existing account
          </Link>
        </div>
      </div>
    )
  );
};

export default Signup;
