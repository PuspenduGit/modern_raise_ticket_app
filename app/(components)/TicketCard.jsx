import React from "react";
import DeleteTicket from "./DeleteTicket";
import ImportantTicket from "./ImportantTicket";
import Status from "./Status";
import StatusDisplay from "./StatusDisplay";
import Link from "next/link";

const TicketCard = ({ ticket }) => {
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
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-1.5">
      <div className="flex mb-3">
        <ImportantTicket importance={ticket.importance} />
        <div className="ml-auto">
          <DeleteTicket id={ticket._id} />
        </div>
      </div>
      <Link href={`/ticket_page/${ticket._id}`} style={{ display: "contents" }}>
        <h3>{ticket.title}</h3>
        <hr className="h-px border-0 bg-page mb-2" />
        <p className="whitespace-pre-wrap">{ticket.description}</p>
        <div className="flex-grow"></div>
        <div className="flex mt-3">
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
