"use client";
import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center bg-nav p-4 shadow-lg">
      <div className="flex items-center space-x-6 text-gray-100">
        <Link href="/" className="hover:text-blue-300 transition duration-200">
          <FontAwesomeIcon icon={faHome} className="text-2xl" />
        </Link>
        {session && (
          <Link
            href="/ticket_page/new"
            className="hover:text-blue-300 transition duration-200">
            <FontAwesomeIcon icon={faTicket} className="text-2xl" />
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-6">
        {!session ? (
          <>
            <Link href="/login">
              <p className="text-gray-100 hover:text-blue-300 transition duration-200 px-4 py-2 rounded-lg hover:bg-blue-500/20">
                LOGIN
              </p>
            </Link>
            <Link href="/signup">
              <p className="text-gray-100 hover:text-blue-300 transition duration-200 px-4 py-2 rounded-lg hover:bg-blue-500/20">
                SIGNUP
              </p>
            </Link>
          </>
        ) : (
          <>
            <p className="text-gray-100 font-semibold px-4 py-2 bg-gray-700/20 rounded-lg">
              {session.user.name || session.user.email}
            </p>
            <button
              className="text-gray-100 hover:text-red-400 transition duration-200 px-4 py-2 rounded-lg hover:bg-red-500/20"
              onClick={() => signOut()}>
              LOGOUT
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
