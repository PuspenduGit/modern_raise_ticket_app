"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();
  // console.log(session);
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
      if (res?.url) router.replace("/");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [session, sessionStatus, router]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex flex-col min-h-screen items-center justify-between p-40">
        <div className="bg-nav-hover w-96 p-8 rounded-2xl shadow-md">
          <h1 className="text-4xl text-center font-semibold">LOGIN</h1>
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
              SIGNIN
            </button>
            {/* {error && <p className="text-red-500 text-center">{error}</p> } */}
          </form>
          <button
            className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full m-2 w-full"
            onClick={() => signIn("google")}>
            Sign in with Google
          </button>
          <div className="block text-center bg-nav-hover mb-2">- OR -</div>
          <Link
            className="bg-nav-hover hover:text-blue-500 font-semibold block text-center"
            href="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    )
  );
};

export default Login;
