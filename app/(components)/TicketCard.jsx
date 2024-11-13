"use client";
import React from "react";
import DeleteTicket from "./DeleteTicket";
import ImportantTicket from "./ImportantTicket";
import Status from "./Status";
import StatusDisplay from "./StatusDisplay";
import Link from "next/link";
import { useSession } from "next-auth/react";

const TicketCard = ({ ticket }) => {
  const session = useSession();
  while (session.status === "loading") return <div>Loading...</div>;

  const identity = session.data.user.name || session.data.user.email;
  const setTime = (time) => {
    const format = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return new Date(time).toLocaleDateString(undefined, format);
  };

  return (
    <div className="ticket-card">
      <div className="flex mb-3">
        <ImportantTicket importance={ticket.importance} />
        <div className="ml-auto">
          {ticket.identity === identity ? (
            <DeleteTicket id={ticket._id} />
          ) : (
            <>{ticket.identity}</>
          )}
        </div>
      </div>
      <Link
        href={ticket.identity === identity ? `/ticket_page/${ticket._id}` : "/"}
        style={{ display: "contents" }}>
        <h3>{ticket.title}</h3>
        <hr className="divider" />
        <p className="whitespace-pre-wrap">{ticket.description}</p>
        <div className="flex-grow"></div>
        <div className="footer">
          <div className="flex flex-col">
            <p className="text-s my-2"> {setTime(ticket.createdAt)}</p>
            <Status status={ticket.progress} />
          </div>
          <div className="ml-auto flex items-end">
            <StatusDisplay statusDisplay={ticket.status} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;
