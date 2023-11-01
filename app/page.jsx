import React from "react";
import TicketCard from "./(components)/TicketCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const fetchTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-cache",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const Dashboard = async () => {
  // const { sessiondata, sessionstatus } = await getServerSession();
  const session = await getServerSession();
  // console.log(session);
  if (!session) {
    redirect("/login");
  }
  const { tickets } = await fetchTickets();

  const categories = [...new Set(tickets?.map((ticket) => ticket.category))];

  return (
    <div className="p-4">
      <div>
        {tickets &&
          categories?.map((category, categoryKey) => (
            <div key={categoryKey}>
              <h2 className="px-4">{category.toUpperCase()}</h2>
              <div className="sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tickets
                  .filter((ticket) => ticket.category === category)
                  .map((ticket, ticketKey) => (
                    <TicketCard
                      key={ticketKey}
                      id={ticketKey}
                      ticket={ticket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
