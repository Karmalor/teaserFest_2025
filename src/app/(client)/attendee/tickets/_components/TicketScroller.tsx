import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import React from "react";
import QRCard from "./QRCard";
import { SelectTicket } from "@/db/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LuCheck,
  LuCheckCircle2,
  LuMoreVertical,
  LuX,
  LuXCircle,
} from "react-icons/lu";
import { formatCurrency } from "@/lib/formatters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ActiveToggleDropdownItem,
  DeleteDropdownItem,
} from "@/app/admin/_components/ticket.actions";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import storeItems from "../../../../../db/items.json";

const TicketScroller = ({ ticket }: { ticket: SelectTicket }) => {
  const item = storeItems.find((i) => i.id === 303);
  if (item === null) return null;

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={item!.imgUrl}
          alt="Product Image"
          width={100}
          height={100}
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-center">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{ticket?.ticketType}</h3>
            {/* <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              description
            </p> */}
          </div>

          <div className="flex flex-1 items-start justify-between text-sm">
            <div className="flex flex-col mt-2 text-left">
              <p className="text-gray-500">{ticket.firstName}</p>
              <p className="text-gray-500">The Civic Theater</p>
              <p className="text-gray-500">Fri, 18Jan</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center">
                <div className="flex items-start justify-end text-end">
                  {!ticket.isCheckedIn ? (
                    <>
                      <div className="font-medium text-primary hover:text-primary/80 text-red-700 hidden md:flex">
                        Not Checked In
                      </div>
                      <div className="font-medium text-primary hover:text-primary/80 text-red-700 flex md:hidden">
                        <LuX />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start justify-end text-end">
                        <div className="font-medium text-primary hover:text-primary/80 text-green-700 hidden md:flex">
                          Checked In
                        </div>
                      </div>
                      <div className="font-medium text-primary hover:text-primary/80 text-green-700 flex md:hidden">
                        <LuCheck />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TicketScroller;