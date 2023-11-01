"use client";
import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Nav = () => {
  const { data: session } = useSession();

  // console.log(session);

  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        {session && (
          <Link href="/ticket_page/new">
            <FontAwesomeIcon icon={faTicket} className="icon" />
          </Link>
        )}
      </div>
      <div className="flex justify-between space-x-4">
        {!session ? (
          <>
            <Link href="/login">
              <p className="text-default-text">LOGIN</p>
            </Link>
            <Link href="/signup">
              <p className="text-default-text">SIGNUP</p>
            </Link>
          </>
        ) : (
          <>
            <p className="text-default-text">{session.user?.email}</p>
            <li className="list-none">
              <button className="text-default-text" onClick={() => signOut()}>
                LOGOUT
              </button>
            </li>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
