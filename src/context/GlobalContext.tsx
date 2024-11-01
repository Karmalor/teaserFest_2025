import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the context's value
interface TicketHolderContextProps {
  ticketHolderFirstName: string;
  setTicketHolderFirstName: (name: string) => void;
}

// Create the context with an empty default value
const TicketHolderContext = createContext<TicketHolderContextProps | undefined>(
  undefined
);

export function TicketHolderProvider({ children }: { children: ReactNode }) {
  const [ticketHolderFirstName, setTicketHolderFirstName] =
    useState<string>("");

  return (
    <TicketHolderContext.Provider
      value={{ ticketHolderFirstName, setTicketHolderFirstName }}
    >
      {children}
    </TicketHolderContext.Provider>
  );
}

export default TicketHolderContext;
