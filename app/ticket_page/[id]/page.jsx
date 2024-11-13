import TicketForm from "@/app/(components)/TicketForm";
import { redirect } from "next/navigation";
import { NEXT_PUBLIC_BASE_API_URL as BASE_API_URL } from "@/app/(utils)/constants";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

const fetchTickets = async (id) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/Tickets/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const TicketPage = async ({ params }) => {
  const session = await getServerSession({ cookies });

  if (!session) {
    redirect("/login");
  }

  const { id } = params;
  let updateTicket = {};

  if (id !== "new") {
    if (!BASE_API_URL) {
      return null;
    }
    const ticketData = await fetchTickets(id);
    updateTicket = ticketData ? ticketData.ticket : {};
  } else {
    updateTicket = { _id: "new" };
  }

  return <TicketForm ticket={updateTicket} />;
};

export default TicketPage;
