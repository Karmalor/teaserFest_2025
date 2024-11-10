"use client";

import { SelectTicket } from "@/db/schema";
import { getTicketByUser } from "@/lib/actions/ticket.actions";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import QRCard from "./_components/QRCard";
import Link from "next/link";

const PurchasedTicketsPage = () => {
  const { user } = useUser();
  const [purchasedTickets, setPurchasedTickets] = useState<SelectTicket[]>([]);

  useEffect(() => {
    if (!user) return;

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
    <div>
      {!user ? (
        <h1>No Tickets Purchased</h1>
      ) : (
        <>
          <h1 className="text-xl m-8">Click to view ticket</h1>
          <div className="flex flex-col sm:flex-row justify-start items-center gap-8 mx-auto sm:mx-16 mt-8">
            {purchasedTickets.map((item, i) => (
              <Link key={i} href={`/attendee/tickets/${item.id}`}>
                <QRCard ticketData={item} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PurchasedTicketsPage;
