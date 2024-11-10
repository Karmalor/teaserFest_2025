"use client";

import { SelectTicket } from "@/db/schema";
import { getTicketByUser } from "@/lib/actions/ticket.actions";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import QRCard from "./_components/QRCard";

const PurchasedTicketsPage = () => {
  const { user } = useUser();

  if (!user) {
    return <h1>No Tickets Purchased</h1>;
  }

  const [purchasedTickets, setPurchasedTickets] = useState<SelectTicket[]>([]);

  useEffect(() => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (!userEmail) return;

    const fetchData = async () => {
      const result = await getTicketByUser(userEmail);
      //   if (!result) return;
      setPurchasedTickets(
        (result || []).filter(
          (ticket): ticket is SelectTicket => ticket !== null
        )
      );
    };
    fetchData();
  }, [user]);

  console.log(purchasedTickets);

  return (
    <div className="flex justify-start items-center gap-4 mx-16 ">
      {purchasedTickets.map((item, i) => (
        <QRCard key={i} ticketData={item} />
      ))}
    </div>
  );
};

export default PurchasedTicketsPage;
