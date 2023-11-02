"use client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";
import { NEXT_PUBLIC_BASE_API_URL as BASE_API_URL } from "@/app/(utils)/constants";

const DeleteTicket = ({ id }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`${BASE_API_URL}/api/Tickets/${id}`, {
      method: "DELETE",
    });
    if (res.ok) router.refresh();
    router.push("/");
  };
  return (
    <FontAwesomeIcon
      icon={faTrash}
      className="text-red-500 cursor-pointer hover:text-red-300"
      onClick={handleDelete}
    />
  );
};

export default DeleteTicket;
