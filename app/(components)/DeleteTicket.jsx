"use client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteTicket = ({ id }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`api/Tickets/${id}`, {
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
