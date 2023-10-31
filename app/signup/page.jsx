"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Signup = () => {

  const router = useRouter();
  
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return re.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if(!validateEmail(email)) {
      setError("Invalid Email!!!");
      return;
    }

    if(password?.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 409) {
        setError("Email already exists");
      } else if(res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Something went wrong!! Try Again");
      console.error(error);
    }
  }

  useEffect(() => {
    if(error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-between p-40">
      <div className="bg-nav-hover w-96 p-8 rounded-2xl shadow-md">
        <h1 className="text-4xl text-center font-semibold">SIGNUP</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="border-2 border-gray-500 w-full h-10 p-2 m-2"
            type="text"
            name="email"
            id="email"
            placeholder="Email.."
            required
          />
          <input
            className="border-2 border-gray-500 w-full h-10 p-2 m-2"
            type="password"
            name="password"
            id="password"
            placeholder="password.."
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full m-2 w-full">
            {" "}
            SIGNUP
          </button>
          {error && <p className="text-red-500 text-center">{error}</p> }
        </form>
        <div className="block text-center bg-nav-hover mb-2">- OR -</div>
        <Link
          className="bg-nav-hover hover:text-blue-500 font-semibold block text-center"
          href="/login">
          Login with an existing account
        </Link>
      </div>
    </div>
  );
};

export default Signup;
