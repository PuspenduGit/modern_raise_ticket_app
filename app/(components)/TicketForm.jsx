"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NEXT_PUBLIC_BASE_API_URL as BASE_API_URL } from "@/app/(utils)/constants";

const TicketForm = ({ ticket }) => {
  const session = useSession();
  const router = useRouter();

  const update = ticket._id !== "new";

  const initialTicketState = {
    title: "",
    description: "",
    category: "frontend",
    importance: "low",
    progress: 0,
    status: "open",
  };

  const [ticketForm, setTicketForm] = useState(initialTicketState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = update
        ? `${BASE_API_URL}/api/Tickets/${ticket._id}`
        : `${BASE_API_URL}/api/Tickets`;
      const method = update ? "PUT" : "POST";
      await fetch(url, {
        method,
        body: JSON.stringify({ ticketForm }),
        "content-type": "application/json",
      });
      router.refresh();
      router.push("/");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (session.status === "loading") return <div>Loading...</div>;

  if (update) {
    const identity = session.data.user.name || session.data.user.email;
    if (identity !== ticket.identity) {
      redirect("/");
    }

    initialTicketState.title = ticket.title;
    initialTicketState.description = ticket.description;
    initialTicketState.category = ticket.category;
    initialTicketState.importance = ticket.importance;
    initialTicketState.progress = ticket.progress;
    initialTicketState.status = ticket.status;
  } else {
    ticketForm.identity = session.data.user.name || session.data.user.email;
  }

  return (
    <div className="ticket-form-container">
      <form method="post" onSubmit={handleSubmit}>
        <h3>{update ? "Update Ticket" : "Create Ticket"}</h3>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={ticketForm.title}
            onChange={(e) =>
              setTicketForm({ ...ticketForm, title: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={ticketForm.description}
            onChange={(e) =>
              setTicketForm({ ...ticketForm, description: e.target.value })
            }></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={ticketForm.category}
            onChange={(e) =>
              setTicketForm({ ...ticketForm, category: e.target.value })
            }>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="design">Design</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="importance">Importance</label>
          <select
            name="importance"
            id="importance"
            value={ticketForm.importance}
            onChange={(e) =>
              setTicketForm({ ...ticketForm, importance: e.target.value })
            }>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="progress">Progress</label>
          <input
            type="range"
            name="progress"
            id="progress"
            value={ticketForm.progress}
            min="0"
            max="100"
            onChange={(e) =>
              setTicketForm({ ...ticketForm, progress: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={ticketForm.status}
            onChange={(e) =>
              setTicketForm({ ...ticketForm, status: e.target.value })
            }>
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <input
          type="submit"
          value={update ? "Update Ticket" : "Create Ticket"}
        />
      </form>
    </div>
  );
};

export default TicketForm;
