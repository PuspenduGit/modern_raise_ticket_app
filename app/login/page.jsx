"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const session = useSession();

  const validateEmail = (email) => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!validateEmail(email)) {
      setError("Invalid Email!!!");
      return;
    }

    if (password?.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError("Something went wrong!! Try Again");
      if (result?.url) router.replace("/");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace("/");
    }
  }, [session, session.status, router]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  if (session.status === "loading") {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
    session.status !== "authenticated" && (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 py-12">
        <div className="bg-white w-full sm:w-96 p-8 rounded-3xl shadow-lg space-y-8">
          <h1 className="text-3xl text-center font-semibold text-gray-800">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              required
            />
            <input
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300">
              Sign In
            </button>
          </form>

          <button
            className="w-full py-3 mt-4 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-100 text-gray-800 font-semibold flex items-center justify-center space-x-3 transition duration-300"
            onClick={() => signIn("google")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 48 48"
              aria-hidden="true">
              <path
                fill="currentColor"
                d="M23.49 12.29c0-.74-.07-1.45-.2-2.13H12v4.15h6.15c-.26 1.35-1.02 2.48-2.15 3.08v2.56h3.47c2.03-1.88 3.17-4.69 3.17-8.08z"></path>
            </svg>
            <span>Sign in with Google</span>
          </button>

          <div className="text-center text-sm text-gray-600 my-4">
            <span>- OR -</span>
          </div>

          <Link
            className="text-indigo-600 hover:text-indigo-800 font-semibold text-center block"
            href="/signup">
            Don&apos;t have an account? Sign Up
          </Link>
        </div>
      </div>
    )
  );
};

export default Login;
