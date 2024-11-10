"use client";

import QRCard from "../_components/QRCard";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { getTicketById } from "@/lib/actions/ticket.actions";
import { SelectTicket } from "@/db/schema";

type TicketData = SelectTicket | null;

function TicketDetailPage({ params }: { params: { ticketId: string } }) {
  const { user } = useUser();
  const ticketId = params.ticketId;
  const [ticketData, setTicketData] = useState<TicketData>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTicketById(ticketId);
      if (!result) return;
      setTicketData(result);
    };
    fetchData();
  }, [ticketId]);

  return (
    <div className="mb-16 mt-16 mx-auto min-h-full">
      <div className="flex justify-center">
        {ticketData ? (
          <QRCard ticketData={ticketData} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <p></p>
    </div>
  );
}

export default TicketDetailPage;
