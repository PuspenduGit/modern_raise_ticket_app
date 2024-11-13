import React from "react";
import TicketCard from "./(components)/TicketCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NEXT_PUBLIC_BASE_API_URL as BASE_API_URL } from "@/app/(utils)/constants";

const fetchTickets = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/Tickets`);
    if (!res.ok) throw new Error("Failed to fetch tickets");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return { tickets: [] };
  }
};

const Dashboard = async () => {
  if (!BASE_API_URL) return null;

  const session = await getServerSession();
  if (!session) redirect("/login");

  const { tickets } = await fetchTickets();
  const categories = Array.from(
    new Set(tickets.map((ticket) => ticket.category))
  );

  return (
    <div className="p-4">
      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="px-4 font-bold text-xl text-gray-700">
            {category.toUpperCase()}
          </h2>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tickets
              .filter((ticket) => ticket.category === category)
              .map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
