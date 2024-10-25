"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import React, { useState } from "react";
import { addTicket, updateTicket } from "../../_actions/tickets";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "@/components/ui/use-toast";
import { SelectTicketTypes } from "@/db/schema";

const TicketForm = ({ ticket }: { ticket?: SelectTicketTypes }) => {
  const [error, action] = useFormState(
    ticket == null ? addTicket : updateTicket.bind(null, ticket.id),
    {}
  );
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    ticket?.priceInCents || undefined
  );

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={ticket?.name || ""}
        />
        {error?.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="number">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
          {...(error?.priceInCents && (
            <div className="text-destructive">{error.priceInCents}</div>
          ))}
        />
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={ticket?.description || ""}
        />
        {error?.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>

      <SubmitButton />
    </form>
  );
};

export default TicketForm;

function SubmitButton() {
  const { pending } = useFormStatus();

  const handleSubmit = () => {
    alert("Ticket created!");
  };

  return (
    <Button type="submit" disabled={pending} onSubmit={handleSubmit}>
      {pending ? "Saving" : "Save"}
    </Button>
  );
}
