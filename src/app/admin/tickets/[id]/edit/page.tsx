import React from "react";
import PageHeader from "../../../_components/PageHeader";
import TicketForm from "../../_components/TicketForm";
import { db } from "@/db";
import { ticketTypesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const NewTicketPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  console.log(id);

  if (!id) {
    return <p>Error: No UUID provided</p>; // Handle undefined UUID
  }

  let ticket = await db
    .select()
    .from(ticketTypesTable)
    .where(eq(ticketTypesTable.id, id));

  if (!ticket || ticket.length === 0) {
    return <p>Ticket not found</p>; // Handle ticket not found case
  }

  return (
    <>
      <PageHeader>Edit Ticket</PageHeader>
      <TicketForm ticket={ticket[0]} />
    </>
  );
};

export default NewTicketPage;
