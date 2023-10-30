import TicketForm from "@/app/(components)/TicketForm";
import React from "react";

const fetchTickets = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const ticket_page = async ({params}) => {
  const { id } = params;
  let updateTicket = {};
  if(id !== "new"){
    updateTicket = await fetchTickets(id);
    updateTicket = updateTicket.ticket;
  }
  else {
    updateTicket = {
      _id : "new",
    }
  }
  return <TicketForm ticket={updateTicket} />;
};

export default ticket_page;
