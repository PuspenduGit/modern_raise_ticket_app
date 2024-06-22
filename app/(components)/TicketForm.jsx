"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NEXT_PUBLIC_BASE_API_URL as BASE_API_URL } from "@/app/(utils)/constants";

const TicketForm = ({ ticket }) => {
  const session = useSession();
  // console.log(session);
  const router = useRouter();

  const update = ticket._id === "new" ? false : true;

  const intitialTicketState = {
    title: "",
    description: "",
    category: "frontend",
    importance: "low",
    progress: 0,
    status: "open",
  };

  const [TicketForm, setTicketForm] = useState(intitialTicketState);

  const handleSubmit = async (e) => {
    if (update) {
      e.preventDefault();
      try {
        await fetch(`${BASE_API_URL}/api/Tickets/${ticket._id}`, {
          method: "PUT",
          body: JSON.stringify({ TicketForm }),
          "content-type": "application/json",
        });
        router.reload();
        router.push("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      e.preventDefault();
      try {
        await fetch(`${BASE_API_URL}/api/Tickets`, {
          method: "POST",
          body: JSON.stringify({ TicketForm }),
          "content-type": "application/json",
        });
        router.refresh();
        router.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  while (session.status === "loading") return <div>Loading...</div>;

  if (update) {
    const identity = session.data.user.name || session.data.user.email;

    if (identity !== ticket.identity) {
      redirect("/");
    }

    intitialTicketState.title = ticket.title;
    intitialTicketState.description = ticket.description;
    intitialTicketState.category = ticket.category;
    intitialTicketState.importance = ticket.importance;
    intitialTicketState.progress = ticket.progress;
    intitialTicketState.status = ticket.status;
  } else {
    TicketForm.identity = session.data.user.name || session.data.user.email;
  }

  return (
    <div className="flex justify-center">
      <form method="post" onSubmit={handleSubmit} className="w-1/2 gap-3">
        <h3>{update ? "Update Ticket" : "Create Ticket"}</h3>
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={TicketForm.title}
            onChange={(e) =>
              setTicketForm({ ...TicketForm, title: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={TicketForm.description}
            onChange={(e) =>
              setTicketForm({ ...TicketForm, description: e.target.value })
            }></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={TicketForm.category}
            onChange={(e) =>
              setTicketForm({ ...TicketForm, category: e.target.value })
            }>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="design">Design</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="importance">Importance</label>
          <select
            name="importance"
            id="importance"
            value={TicketForm.importance}
            onChange={(e) =>
              setTicketForm({ ...TicketForm, importance: e.target.value })
            }>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="progress">Progress</label>
          <input
            type="range"
            name="progress"
            id="progress"
            value={TicketForm.progress}
            min="0"
            max="100"
            onChange={(e) =>
              setTicketForm({ ...TicketForm, progress: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={TicketForm.status}
            onChange={(e) =>
              setTicketForm({ ...TicketForm, status: e.target.value })
            }>
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
          </select>
          <input
            type="submit"
            className="btn"
            value={update ? "Update" : "Submit"}
          />
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
