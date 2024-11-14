import { SelectTicket } from "@/db/schema";
import React from "react";
import TicketScroller from "./TicketScroller";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QRCard from "./QRCard";

const TicketModal = ({ ticket }: { ticket: SelectTicket }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="w-full">
          <TicketScroller ticket={ticket} key={ticket.id} />
        </DialogTrigger>
        <DialogContent className="bg-[#FFF0F0]">
          <DialogHeader className="flex justify-center items-center">
            <DialogTitle>
              <div className="w-full mx-auto">
                <QRCard ticketData={ticket} />
              </div>
            </DialogTitle>
            <DialogDescription
              className="w-full pt-8 text-left
            "
            >
              Please present this ticket at the door for scanning
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TicketModal;
