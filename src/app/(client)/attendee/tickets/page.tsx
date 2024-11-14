"use client";

import { SelectTicket } from "@/db/schema";
import { getTicketByUser } from "@/lib/actions/ticket.actions";
import { useClerk, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import QRCard from "./_components/QRCard";
import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import TicketScroller from "./_components/TicketScroller";
import { Button } from "@/components/ui/button";
import TicketModal from "./_components/TicketModal";

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

  return (
    <div>
      <h1 className="text-xl m-8">Click to view ticket</h1>
      {purchasedTickets.map((ticket) => (
        <div
          key={ticket.id}
          className="mx-8 sm:mx-auto w-10/12 sm:w-1/2 xl:w-1/3"
        >
          <TicketModal ticket={ticket} key={ticket.id} />
        </div>
      ))}
      {purchasedTickets.length < 1 ? (
        <div className="flex justify-center items-center w-full mt-8">
          <Link href={"/showcases"}>
            <Button>Get tickets</Button>
          </Link>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full mt-8">
          <Link href={"/showcases"}>
            <Button>View More</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PurchasedTicketsPage;
