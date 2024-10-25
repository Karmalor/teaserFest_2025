import React from "react";
import PageHeader from "../../_components/PageHeader";
import TicketForm from "../_components/TicketForm";

const NewTicketPage = () => {
  return (
    <>
      <PageHeader>Add Ticket</PageHeader>
      <TicketForm />
    </>
  );
};

export default NewTicketPage;
